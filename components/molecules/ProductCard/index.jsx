import { formatRupiah } from '@/utils/helpers';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import { HiStar } from 'react-icons/hi';
import { MdFavorite, MdAddShoppingCart } from 'react-icons/md';
import { useEffect, useState } from 'react';
import callAPI from '@/config/api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useCartContext } from '@/context/CartContext';
import { BiMap } from 'react-icons/bi';

export default function ProductCard({ product }) {
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const distance = (long1, lat1, long2, lat2) => {
    let d1 = Math.abs(long1 - long2) * 111.319;
    let d2 = Math.abs(lat1 - lat2) * 110.574;
    return Math.sqrt(d1 * d1 + d2 * d2);
  };
  if (typeof window !== 'undefined') {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLong(position.coords.longitude);
        setLat(position.coords.latitude);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  const star = () => {
    let tmp = 0;
    product.review_products.forEach((data) => {
      tmp += data.review_score;
    });
    tmp = tmp / product.review_products.length;
    return +(Math.round(tmp + 'e+1') + 'e-1');
  };
  console.log(product);
  const addToCart = async (id) => {
    const toastLoading = toast.loading('Tunggu ya, sedang diproses ...');
    try {
      const response = await callAPI({
        path: '/api/carts',
        method: 'POST',
        data: { product_id: id },
        token: Cookies.get('token'),
      });
      if (response.status === 422) {
        toast.error(response.data.message, {
          id: toastLoading,
        });
      } else {
        toast.success('Product sudah ditambahkan ke keranjang.', {
          id: toastLoading,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className='relative group'>
        <div className='relative w-full overflow-hidden bg-gray-200 min-h-80 aspect-[4/6] rounded-xl'>
          <Image
            src={product.photos.length > 0 ? product.photos[0].product_image_path : '/images/products/kol.png'}
            alt={product.product_name}
            layout='fill'
            priority={true}
            unoptimized={true} // for handle access for bidden
            className='object-cover object-center w-full h-full lg:w-full lg:h-full'
          />
          <button type='button' className='absolute p-2 text-white top-4 right-4 bg-primary-500 rounded-xl'>
            <MdFavorite className='w-5 h-5' />
          </button>
          <div className='absolute flex items-center justify-between w-full px-4 space-x-3 bottom-4'>
            <Link
              href={`/products/${product.product_slug}`}
              className='block w-full px-3 py-2 text-sm text-center text-white bg-primary-500 rounded-xl'>
              Detail Produk
            </Link>
            {Cookies.get('token') ? (
              <button
                type='button'
                onClick={() => addToCart(product.id)}
                className='p-2 text-sm text-white bg-primary-500 rounded-xl'>
                <MdAddShoppingCart className='w-5 h-5' />
              </button>
            ) : (
              <Link href='/login' className='p-2 text-sm text-white bg-primary-500 rounded-xl'>
                <MdAddShoppingCart className='w-5 h-5' />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className='flex justify-between mt-2'>
        <div>
          <h3 className='text-base font-semibold text-gray-700'>
            <Link href={`/products/${product.product_slug}`}>
              <span aria-hidden='true' className='' />
              {product.product_name}
            </Link>
          </h3>
          <p className='text-xl font-semibold text-gray-500'>{formatRupiah(product.product_price)}</p>
          <p className='py-1 text-sm text-gray-700'>{product.store.store_name}</p>
          <div className='flex items-center justify-start w-full space-x-3'>
            <div className='flex items-center justify-start space-x-1'>
              <HiStar className='w-4 h-4 text-yellow-300' />
              <span className='text-sm'>{star() >= 0 ? star() : '0'}</span>
            </div>
            <span className='w-px h-4 bg-gray-500' aria-hidden='true' />
            <p className='text-sm'>Terjual {product.product_sold}</p>
          </div>
          <p className='inline-flex items-baseline space-x-2 text-sm'>
            <span>{product.store.store_city}</span>{' '}
            <span>
              <BiMap />
            </span>{' '}
            <span>{parseInt(distance(long, lat, product.store.store_long, product.store.store_lat))} KM</span>
          </p>
        </div>
      </div>
    </div>
  );
}

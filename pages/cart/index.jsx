import Link from '@/components/atoms/Link';
import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';
import Image from 'next/image';
import { HiOutlineShoppingCart, HiOutlineTrash } from 'react-icons/hi';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import CardProduct from '@/components/molecules/ProductCard';

import { formatRupiah } from '@/utils/helpers';
import { useCartContext } from '@/context/CartContext';

export default function Cart() {
  const { state, dispatch } = useCartContext();

  return (
    <>
      <Main className='relative min-h-screen'>
        <div className='relative max-w-5xl px-4 pt-20 mx-auto sm:px-6 lg:px-8'>
          <h3 className='flex items-center justify-start space-x-3 text-xl font-semibold'>
            <HiOutlineShoppingCart className='w-5 h-5' />
            <span>Keranjang Belanja</span>
          </h3>
          {Object.keys(state.cart).length > 0 ? (
            <div className='pt-4 mt-4 border-t border-gray-200'>
              <div className='grid grid-cols-3 gap-8'>
                <div className='col-span-2'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id='check-all'
                          name='check-all'
                          type='checkbox'
                          className='w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500'
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label htmlFor='check-all' className='font-medium text-gray-700 select-none'>
                          Pilih Semua
                        </label>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <button type='button' className='py-1 text-sm text-primary-600 hover:text-primary-500'>
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    {Object.keys(state.cart).map((i) => {
                      const { product, store, photos } = state.cart[i];
                      return (
                        <li key={i} className='flex py-6'>
                          <div className='flex items-center h-5'>
                            <input
                              id='check-all'
                              name='check-all'
                              type='checkbox'
                              className='w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500'
                            />
                          </div>
                          <div className='relative flex-shrink-0 w-24 h-24 ml-3 overflow-hidden border border-gray-200 rounded-md'>
                            <Image
                              src={photos.length > 0 ? photos[0].product_image_path : '/images/products/kol.png'}
                              alt={product.product_name}
                              layout='fill'
                              className='object-cover object-center w-full h-full'
                            />
                          </div>

                          <div className='flex flex-col flex-1 ml-4'>
                            <div>
                              <div className='flex justify-between text-base font-medium text-gray-900'>
                                <h3>
                                  <a href={`/products/${product.product_slug}`}>{product.product_name}</a>
                                </h3>
                                <p className='ml-4'>{formatRupiah(product.product_price)}</p>
                              </div>
                              <p className='mt-1 text-sm text-gray-500'>
                                {product.category.category_name} - {product.sub_category.sub_category_name}
                              </p>
                            </div>
                            <div className='flex items-end justify-between flex-1 text-sm'>
                              <p className='text-gray-500'>Jumlah 1</p>
                              <div className='flex items-center space-x-5'>
                                <div className='flex items-center space-x-2'>
                                  <button type='button' className='p-1'>
                                    <AiOutlineMinusCircle className='w-5 h-5' />
                                  </button>
                                  <div>1</div>
                                  <button type='button' className='p-1'>
                                    <AiOutlinePlusCircle className='w-5 h-5' />
                                  </button>
                                </div>
                                <button
                                  type='button'
                                  onClick={() =>
                                    dispatch({
                                      type: 'REMOVE_FROM_CART',
                                      id: product.id,
                                      price: product.product_price,
                                    })
                                  }
                                  className='font-medium text-rose-600 hover:text-rose-500'>
                                  <HiOutlineTrash className='w-5 h-5' />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className='p-5 border border-gray-100 rounded-lg'>
                    <h3 className='font-semibold'>Ringkasan Belanja</h3>
                    <p className='pt-1 pb-2 text-xs'>Total Harga </p>
                    <div className='flex items-center justify-between pt-3 border-t border-gray-200 '>
                      <span>Total</span>
                      <span>{formatRupiah(state.totalPrice)}</span>
                    </div>
                    <div className='pt-4'>
                      <button
                        type='button'
                        className='block w-full py-2 text-sm text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                        Beli
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
        <div className='relative max-w-5xl px-4 py-12 mx-auto sm:px-6 lg:px-8'>
          <h3 className='flex items-center justify-start pb-6 space-x-3 text-xl font-semibold'>
            <span>Rekomendasi untuk kamu</span>
          </h3>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8'>
            {[1, 2, 3, 4].map((i) => (
              // <CardProduct key={i} product={} />
              <div key={i}>Rekomendation </div>
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}

const EmptyCart = () => {
  return (
    <div className='pt-4 mt-4 border-t border-gray-200'>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative h-64 aspect-square'>
          <Image src='/images/empty-cart.svg' alt='Empty Cart' layout='fill' priority={true} />
        </div>
        <div className='text-center'>
          <h5 className='text-2xl font-semibold'>Wah! Keranjang Belanja Kamu Kosong</h5>
          <p className='py-3'>Yuk, isi dengan sayur atau buah!</p>
          <Link
            href='/products'
            className='inline-flex items-center justify-center px-4 py-2 text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
            Mulai Berbelanja
          </Link>
        </div>
      </div>
    </div>
  );
};

Cart.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Your Cart',
  },
};

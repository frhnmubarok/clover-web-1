import Illustration from '@/components/atoms/Illustration';
import Link from '@/components/atoms/Link';
import Main from '@/components/atoms/Main';
import ProductCard from '@/components/molecules/ProductCard';
import Slider from '@/components/molecules/Slider';
import AppLayout from '@/components/templates/AppLayout';
import callAPI from '@/config/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiArrowRight, HiOutlineExternalLink, HiOutlinePlay } from 'react-icons/hi';

const images = [
  'https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1532509774891-141d37f25ae9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1508094427028-b1e27931dddb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
];

const JoinAndWatchButton = () => {
  return (
    <div className='grid order-4 w-full grid-cols-1 gap-3 py-5 text-center sm:flex sm:gap-0 sm:space-x-6'>
      <Link
        href='/register-partner'
        className='inline-flex items-center justify-center px-4 py-3 space-x-2 text-sm font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-500 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
        <HiOutlineExternalLink className='w-5 h-5' />
        <span>Mulai Menjadi Mitra</span>
      </Link>
      <button
        type='button'
        className='inline-flex items-center justify-center px-4 py-3 space-x-2 text-sm font-semibold text-gray-700 duration-200 ease-in-out bg-white border rounded-lg boder-gray-400 hover:bg-gray-200 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
        <HiOutlinePlay className='w-5 h-5' />
        <span>Cara Kerja</span>
      </button>
    </div>
  );
};
export default function Home({ data }) {
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(1);
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    if (data !== null) {
      setProducts(data.data.data);
      setNextPage(data.data.next_page_url);
    }
  }, [data]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const { data } = await callAPI({
        url: `https://api-clover.herokuapp.com/api/products?page=${more}`,
        method: 'GET',
      });

      setProducts([...products, ...data.data]);
      setMore(more + 1);
      setLoading(false);
    } catch (error) {
      console.info(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Main className='relative min-h-screen'>
        <div className='container'>
          <div className='flex flex-col-reverse items-center justify-center min-h-screen md:flex-row'>
            <div className='md:flex-1'>
              <div className='flex flex-col items-start select-none'>
                <div>
                  <div className='order-1 py-2 text-4xl font-semibold text-gray-700 md:text-6xl md:leading-none'>
                    <h1>
                      <span className='text-primary-500'>Embrace</span>
                    </h1>
                    <h2>
                      New Ways <span className='text-primary-500'>to Farm</span>
                    </h2>
                  </div>
                  <p className='order-2 mr-6 text-base font-semibold leading-relaxed text-gray-700'>
                    Dapatkan sayuran, buah - buahan, alat - alat, dan bahan - bahan pertanian terbaik langsung dari
                    tangan petani.
                    <br />
                    Mulai menjalani hidup sehat dengan memilih produk sayuran dan buah - buahan dari kami.
                  </p>
                </div>
                <JoinAndWatchButton />
              </div>
            </div>
            <div className='flex items-center justify-center pt-20 md:flex-1 sm:pt-0'>
              <Illustration className='w-[330px] md:w-[500px] h-auto py-3' />
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='pb-12'>
            <Slider images={images} />
          </div>
        </div>
        <div className='container'>
          <div className='pb-12'>
            <h2 className='text-3xl font-semibold'>Spesial Hari Ini Di Clover</h2>
          </div>
          <div className='overflow-x-hidden max-w-7xl'>
            <div className='flex w-screen space-x-5 flex-nowrap'>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className='relative w-[500px] h-[166px] rounded-lg overflow-hidden'>
                  <Image
                    src='https://images.unsplash.com/photo-1543364195-bfe6e4932397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80'
                    alt='Special'
                    layout='fill'
                    priority={true}
                    className='object-cover object-center'
                  />
                  <div className='absolute w-full h-full bg-gradient-to-r from-gray-700 to-transparent'></div>
                  <h2 className='absolute w-3/5 text-2xl text-white top-5 left-5'>Sayuran Segar Dari Kebun Petani</h2>
                  <button
                    type='button'
                    className='absolute inline-flex px-2 py-1 text-xs font-semibold bg-white rounded-lg bottom-5 right-5'>
                    Detail
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className='min-h-screen'>
            <div className='container py-14'>
              <div className='flex items-center justify-between pb-12'>
                <div>
                  <h2 className='text-3xl font-semibold'>Produk Rekomendasi Untuk Kamu</h2>
                  <p>Produk - produk rekomendasi spesial untuk kamu</p>
                </div>
                <Link
                  href='/products'
                  className='inline-flex items-center justify-center px-4 py-2 space-x-2 text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                  <span>Lihat Semua Produk</span>
                  <HiArrowRight className='w-5 h-5' />
                </Link>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-8'>
                {products.map((product, i) => (
                  <ProductCard
                    key={i}
                    slug={product.product_slug}
                    title={product.product_name}
                    price={product.product_price}
                    owner={product.store.store_name}
                    rating={5}
                    soldout={1000}
                    image={
                      product.photos.length > 0 ? product.photos[0].product_image_path : '/images/products/kol.png'
                    }
                  />
                ))}
              </div>
              <div className='flex items-center justify-center pt-12'>
                {nextPage && (
                  <button
                    type='button'
                    onClick={loadMore}
                    disabled={loading}
                    className='inline-flex items-center justify-center w-full max-w-md py-3 text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50'>
                    {loading ? 'Loading' : 'Muat Lebih Banyak'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

Home.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Home Clover',
  },
};

export const getServerSideProps = async () => {
  const { data } = await callAPI({
    path: '/api/products',
    method: 'GET',
  });

  return {
    props: {
      data,
    },
  };
};

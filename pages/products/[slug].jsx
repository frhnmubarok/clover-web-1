import Link from '@/components/atoms/Link';
import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';
import callAPI from '@/config/api';
import { useCartContext } from '@/context/CartContext';
import { classNames, formatRupiah } from '@/utils/helpers';
import { Dialog, Tab, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { HiChat, HiPlusCircle, HiStar } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';

export default function ProductDetail({ data }) {
  const { product, category, sub_category, photos, store, reviews } = data.data;
  const [isOpen, setIsOpen] = useState(false);

  const { dispatch } = useCartContext();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let [categories] = useState({
    Detail: [
      {
        id: 1,
        title: 'Stok',
        description: product.product_stock,
      },
      {
        id: 1,
        title: 'Berat',
        description: '1 Kg',
      },
      {
        id: 1,
        title: 'Category',
        description: category.category_name,
      },
      {
        id: 2,
        title: 'Deskripsi Barang',
        description: product.product_description,
      },
    ],
    'Catatan Penjual': [
      {
        id: 1,
        title: 'Jadwal Pengiriman',
        description: '13.00 WIB - 23.59 WIB',
      },
      {
        id: 2,
        title: 'Ekspedisi Yang Tersedai',
        description: 'JNJ, JNM, JUMANJI, dan NINBA Express.',
      },
    ],
  });
  return (
    <>
      <Main className='relative min-h-screen text-gray-700'>
        <div className='container relative py-28'>
          <div className='grid gap-8 xl:grid-cols-12'>
            <div className='col-span-4'>
              <div className='rounded-2xl'>
                <div className='relative w-full overflow-hidden border border-gray-200 aspect-square rounded-2xl'>
                  <Image
                    src={photos.length > 0 ? photos[0].product_image_path : '/images/products/kol.png'}
                    alt='Image 1'
                    layout='fill'
                    priority={true}
                    className='object-cover object-center'
                  />
                </div>
              </div>
              <div className='flex items-center justify-between py-4'>
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    className={classNames(
                      'relative bg-gray-100 rounded-xl h-[80px] aspect-square overflow-hidden',
                      i === 0 && 'border-2 border-primary-500',
                    )}>
                    <Image
                      src={photo.product_image_path}
                      alt='Image 1'
                      layout='fill'
                      priority={true}
                      className='object-cover object-center'
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='col-span-5'>
              <div className='flex flex-col'>
                <h1 className='text-xl font-semibold'>{product.product_name}</h1>
                <div className='flex items-center py-2 space-x-3 '>
                  <h3>Terjual 10.000</h3>
                  <span>|</span>
                  <HiStar className='w-5 h-5 text-yellow-300' /> 5
                </div>
                <div className='text-3xl font-semibold'>{formatRupiah(product.product_price)}</div>
              </div>
              <div className='pt-3'>
                <div className='w-full'>
                  <Tab.Group>
                    <Tab.List className='flex p-1 space-x-1 bg-gray-100 rounded-lg'>
                      {Object.keys(categories).map((category, i) => (
                        <Tab
                          key={i}
                          className={({ selected }) =>
                            classNames(
                              'w-full py-1.5 text-sm leading-5 font-medium text-primary-700 rounded-lg focus:outline-none',
                              selected ? 'bg-white shadow' : 'text-primary-600 hover:bg-white/[0.12]',
                            )
                          }>
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels>
                      {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel key={idx} className={classNames('bg-white rounded-xl py-3')}>
                          <ul>
                            {posts.map((post, i) => (
                              <li key={i} className='relative pb-3 rounded-md'>
                                <h3 className='text-sm font-medium leading-5'>{post.title}</h3>

                                <ul className='flex mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500'>
                                  <li>{post.description}</li>
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
              <div className='pt-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='relative h-[48px] overflow-hidden rounded-full aspect-square '>
                      <Image
                        src={store.store_image_profile}
                        alt='Photo Store'
                        layout='fill'
                        className='object-cover object-center'
                      />
                    </div>
                    <div>
                      <h1 className='font-semibold'>{store.store_name}</h1>
                      <p className='text-xs text-gray-500'>
                        Lokasi di{' '}
                        <span className='text-primary-500'>{`${store.store_city} - ${store.store_province}`}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link
                      href='/'
                      className='px-3 py-2 text-sm text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                      Kunjungi Toko
                    </Link>
                  </div>
                </div>
                <div className='pt-4'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum assumenda ipsum iure repellendus ab,
                  ducimus dolores aliquam tempore molestias, possimus ullam facere excepturi voluptate vero rem
                  distinctio optio dolorem. Vel.
                </div>
              </div>
            </div>
            <div className='col-span-3'>
              <div className='flex flex-col space-y-5'>
                <button
                  type='button'
                  onClick={() =>
                    dispatch({
                      type: 'ADD_TO_CART',
                      item: { product: { product }, store, category, sub_category, photos },
                    })
                  }
                  className='inline-flex items-center justify-center w-full py-2 space-x-2 text-sm text-white duration-150 ease-in-out border border-transparent rounded-lg bg-primary-500 group hover:bg-primary-600 hover:ring-2 hover:ring-offset-2 hover:ring-sky-500'>
                  <HiPlusCircle className='w-5 h-5 text-primary-300 group-hover:text-primary-400' />
                  <span>Keranjang</span>
                </button>
                <button
                  type='button'
                  onClick={() => setIsOpen(true)}
                  className='inline-flex items-center justify-center w-full py-2 text-sm font-semibold text-gray-700 duration-150 ease-in-out bg-white border-2 border-gray-300 rounded-lg group hover:ring-2 hover:ring-offset-2 hover:ring-sky-500'>
                  Beli Sekarang
                </button>
                <div className='flex items-center justify-between'>
                  <button
                    type='button'
                    className='flex items-center justify-center px-2 py-2 space-x-1 text-sm font-semibold rounded-lg hover:bg-gray-100'>
                    <HiChat className='w-5 h-5 text-primary-400' />
                    <span>Chat</span>
                  </button>
                  <button
                    type='button'
                    className='flex items-center justify-center px-2 py-2 space-x-1 text-sm font-semibold rounded-lg hover:bg-gray-100'>
                    <MdFavorite className='w-5 h-5 text-pink-500' />
                    <span>Wishlist</span>
                  </button>
                  <button
                    type='button'
                    className='flex items-center justify-center px-2 py-2 space-x-1 text-sm font-semibold rounded-lg hover:bg-gray-100'>
                    <AiOutlineShareAlt className='w-5 h-5 text-primary-400' />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-10'>
            <div>
              <h1 className='text-2xl font-semibold'>Ulasan</h1>
              <p className='text-xs'>500 Ulasan</p>
            </div>
            <div className='inline-flex flex-col items-center justify-center'>
              <div className='flex items-end py-3'>
                <span className='text-[90px] leading-[60px]'>4</span>
                <span>/5</span>
              </div>
              <div className='flex items-center'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <HiStar key={i} className='w-6 h-6 text-yellow-300' />
                ))}
              </div>
              <p className='text-xs text-gray-400'>500 Ulasan</p>
            </div>
          </div>
          <div className='pt-5'>
            <div className='grid grid-cols-12 gap-8'>
              <div className='col-span-9'>
                {[1, 2, 4, 5].map((i) => (
                  <div key={i} className='flex flex-col pb-12 space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        <div className='relative h-[48px] overflow-hidden rounded-full aspect-square '>
                          <Image
                            src={
                              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                            }
                            alt='Photo Store'
                            layout='fill'
                            className='object-cover object-center'
                          />
                        </div>
                        <div>
                          <h1 className=''>Fahmi Idris</h1>
                          <p className='text-xs text-gray-500'>Hari Ini</p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <div className='flex items-center'>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <HiStar key={i} className='w-6 h-6 text-yellow-300' />
                          ))}
                        </div>
                        <button type='button' className='px-4 py-2 text-xs text-white rounded-lg bg-rose-500'>
                          Laporkan
                        </button>
                      </div>
                    </div>
                    <div>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta amet temporibus, exercitationem
                      eaque voluptate laudantium sed dolore in molestiae excepturi repellendus cum quibusdam iusto magni
                      dolorem totam? Deserunt, perferendis rerum?
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={closeModal}>
              <div className='min-h-screen px-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'>
                  <Dialog.Overlay className='fixed inset-0 bg-gray-200/50 backdrop-blur-sm' />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className='inline-block h-screen align-middle' aria-hidden='true'>
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'>
                  <div className='inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                      Beli Langsung
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        Your payment has been successfully submitted. We’ve sent you an email with all of the details of
                        your order.
                      </p>
                    </div>

                    <div className='flex mt-4 space-x-2'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-primary-900 bg-primary-100 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500'>
                        Checkout!
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-rose-900 bg-rose-100 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500'
                        onClick={closeModal}>
                        Batal
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      </Main>
    </>
  );
}

ProductDetail.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Clover',
  },
};

export async function getStaticPaths() {
  const { data } = await callAPI({
    path: '/api/products',
    method: 'GET',
  });
  // console.log(data.data.data);
  const paths = data.data.data.map((item) => ({
    params: { slug: item.product_slug },
  }));

  console.info(paths);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { data } = await callAPI({
    path: '/api/products/' + params.slug,
    method: 'GET',
  });

  return {
    props: {
      data,
    },
  };
}

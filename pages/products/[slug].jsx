import Link from '@/components/atoms/Link';
import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';
import callAPI from '@/config/api';
import { classNames, formatRupiah } from '@/utils/helpers';
import { Dialog, Tab, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { HiChat, HiPlusCircle, HiStar } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useCartContext } from '@/context/CartContext';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';



export default function ProductDetail({ data }) {
  const router = useRouter();
  const { product, category, sub_category, photos, store, reviews } = data.data;
  const [amount, setAmount] = useState(0);
  const { state, dispatch } = useCartContext();

  const [isOpen, setIsOpen] = useState(false);
  const star = () => {
    let tmp = 0;
    reviews.forEach((data) => {
      tmp += data.review_score;
    });
    tmp = tmp / reviews.length;
    return +(Math.round(tmp + 'e+1') + 'e-1');
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  
  const send = () => {
    const tempData = product
    tempData.photos = photos
    const data = { store, items: [{product:tempData, amount}] };
    dispatch({ type: 'ADD_TRANSACTION', payload: data });
    console.log(data)
    router.push('/cart/checkout');
  };
  const addAmount = () => {
    setAmount(amount + 1);
  };

  const minusAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

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
        title: 'Ekspedisi Yang Tersedia',
        description: 'JNE, POS, TIKI',
      },
    ],
  });
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
                  <h3>Terjual {product.product_sold}</h3>
                  <span>|</span>
                  <HiStar className='w-5 h-5 text-yellow-300' /> {star() >= 0 ? star() : '0'}
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
                <div className='pt-4'>{store.store_description}</div>
              </div>
            </div>
            <div className='col-span-3'>
              <div className='flex flex-col space-y-5'>
                <button
                  type='button'
                  onClick={() => addToCart(product.id)}
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
              <p className='text-xs'>{reviews.length} Ulasan</p>
            </div>
            <div className='inline-flex flex-col items-center justify-center'>
              <div className='flex items-end py-3'>
                <span className='text-[90px] leading-[60px]'>{star() >= 0 ? star() : '0'}</span>
                <span>/5</span>
              </div>
              <div className='flex items-center'>
                {[1, 2, 3, 4, 5].map((i) => {
                  if (i <= star()) {
                    return <HiStar key={i} className='w-6 h-6 text-yellow-300' />;
                  }
                })}
              </div>
              <p className='text-xs text-gray-400'>{reviews.length} Ulasan</p>
            </div>
          </div>
          <div className='pt-5'>
            <div className='grid grid-cols-12 gap-8'>
              <div className='col-span-9'>
                {reviews.map((data, i) => (
                  <div key={i} className='flex flex-col pb-12 space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        <div className='relative h-[48px] overflow-hidden rounded-full aspect-square '>
                          <Image
                            src={
                              data.user.photo === ''
                                ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                                : data.user.photo
                            }
                            alt='Photo Store'
                            layout='fill'
                            className='object-cover object-center'
                          />
                        </div>
                        <div>
                          <h1 className=''>{data.user.fullname}</h1>
                          <p className='text-xs text-gray-500'>{data.created_at.split('T')[0]}</p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <div className='flex items-center'>
                          {[1, 2, 3, 4, 5].map((i) => {
                            if (i <= data.review_score) {
                              return <HiStar key={i} className='w-6 h-6 text-yellow-300' />;
                            }
                          })}
                        </div>
                        {/* <button type='button' className='px-4 py-2 text-xs text-white rounded-lg bg-rose-500'>
                          Laporkan
                        </button> */}
                      </div>
                    </div>
                    <div>{data.review_comment}</div>
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
                        Produk akan ditambahkan, silakan lengkapi jumlah pesanan anda.
                      </p>
                      <div className='flex items-end justify-between flex-1 text-sm'>
                        <p className='text-gray-500'>{formatRupiah(state.totalPrice)}</p>
                        <div className='flex items-center space-x-5'>
                          <div className='flex items-center space-x-2'>
                            <button
                              type='button'
                              className='p-1 disabled:text-gray-400'
                              onClick={() => {
                                if (amount > 0) {
                                  dispatch({ type: 'SUB_PRICE', payload: product.product_price });
                                }
                                minusAmount();
                              }}>
                              <AiOutlineMinusCircle className='w-5 h-5' />
                            </button>
                            {/* <input type='number' className='text-sm w-14' readOnly /> */}
                            <div>{amount}</div>
                            <div></div>
                            <button
                              type='button'
                              className='p-1 disabled:text-gray-400'
                              onClick={() => {
                                dispatch({ type: 'SUM_PRICE', payload: product.product_price });
                                addAmount();
                              }}>
                              <AiOutlinePlusCircle className='w-5 h-5' />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex mt-4 space-x-2'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-primary-900 bg-primary-100 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500'
                        onClick={()=>send()}>
                        Beli Sekarang
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

export const getServerSideProps = async ({ params }) => {
  const { data } = await callAPI({
    path: '/api/products/' + params.slug,
    method: 'GET',
  });

  return {
    props: {
      data,
    },
  };
};

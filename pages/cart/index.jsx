import Link from '@/components/atoms/Link';
import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';
import Image from 'next/image';
import { HiOutlineShoppingCart, HiOutlineTrash } from 'react-icons/hi';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import ProductCard from '@/components/molecules/ProductCard';

import { formatRupiah } from '@/utils/helpers';
import { useCartContext } from '@/context/CartContext';
import { useEffect, useState, Fragment } from 'react';
import FullscreenLoading from '@/components/atoms/FullscreenLoading';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter}  from 'next/router'

export default function Cart() {
  const router = useRouter();
  const { state, dispatch } = useCartContext();
  const [isLoading, setIsLoading] = useState(true);
  const [checkedProduct, setCheckedProduct] = useState([]);
  const [isProductChecked, setIsProductChecked] = useState([]);
  const [data, setData] = useState({
    transactionShippingCost: 10000,
    store_id: 0,
    items: [],
  });
  const [transactionShippingCost, setTransactionShippingCost] = useState(10000);
  const [storeId, setStoreId] = useState(0);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState([]);
  const [statusCheck, setStatusCheck] = useState([]);
  const [checkbox, setCheckbox] = useState(false)

  useEffect(()=>{
    if(items.length>=1){
      setCheckbox(true)
    }else{
      setCheckbox(false)
    }
  },[items])
  const loadingState = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center items-center h-full'>
          <FullscreenLoading />
        </div>
      );
    } else {
      return <EmptyCart />;
    }
  };

  useEffect(() => {
    if (state.cart.length > 0) {
      setIsLoading(false);
    }
  }, [state.cart]);

  // useEffect(() => {
  //   console.log(checkedProduct);
  // }, [checkedProduct]);

  setTimeout(() => {
    if (amount.length < 1) {
      let temp = [];
      let status = [];
      state.cart.forEach(() => {
        temp.push(1);
        status.push(false);
      });
      setAmount(temp);
      setStatusCheck(status);
    }
  }, 1000);

  const addData = (i) => {
    if (items.length == 0) {
      setStoreId(state.cart[i].store_id);
      setItems([...items, i]);
    }
    if (storeId === state.cart[i].store_id) {
      let status = true;
      let product = state.cart[i].id;
      items.forEach((data) => {
        if (state.cart[data].id === product) {
          // console.log(product, data.id);
          status = false;
        }
      });
      if (status) {
        setItems([...items, i]);
        return true;
      } else {
        return false;
      }
    }
  };
  // console.log(state.recommendation)
  const removeData = (id) => {
    let tempData = items.filter((item) => {
      return item !== id;
    });
    // console.log(tempData);
    setItems(tempData);
  };

  const addAmount = (id) => {
    let tempData = amount;
    tempData[id]++;
    setAmount([...amount, tempData]);
    // console.log(amount);
  };

  const minAmount = (id) => {
    let tempData = amount;
    if (tempData[id] > 0) {
      tempData[id]--;
    }
    setAmount([...amount, tempData]);
    // console.log(amount);
  };

  const send = () => {
    // console.log(storeId, items);
    let tempData = [];
    let store = {}
    items.forEach((data) => {
      tempData.push({
        product: state.cart[data],
        amount: amount[data],
      });
      store = state.cart[data].store
      // console.log(state.cart[data])
    });
    const data = { store:store, items: tempData };
    // console.log(data);
    dispatch({ type: 'ADD_TRANSACTION', payload: data });
    if(items.length >0){
      router.push('/cart/checkout');
    }
  };

  const removeItem = (id) =>{
    axios({
        method: 'DELETE',
        url: 'https://dev-api-clover.herokuapp.com/api/carts/'+id,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token'),
        },
      }).then(() => {
        console.log('ok')
      });
  }

  const statusTrue = (id) => {
    let status = statusCheck;
    status[id] = true;
    setStatusCheck(status);
  };

  const statusFalse = (id) => {
    let status = statusCheck;
    status[id] = false;
    setStatusCheck(status);
  };

  // console.log(isProductChecked);

  return (
    <>
      <Main className='relative min-h-screen'>
        <div className='relative max-w-5xl px-4 pt-20 mx-auto sm:px-6 lg:px-8'>
          <h3 className='flex items-center justify-start space-x-3 text-xl font-semibold'>
            <HiOutlineShoppingCart className='w-5 h-5' />
            <span>Keranjang Belanja</span>
          </h3>
          {isLoading && <FullscreenLoading />}
          {state.cart.length > 0 ? (
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
                    {state.cart.map((item, i) => {
                      {
                        /* const { product, store, photos } = state.cart[i]; */
                      }
                      return (
                        <li key={i} className='flex py-6'>
                          <div className='flex items-center h-5'>
                            <input
                              id='check-all'
                              name='check-all'
                              type='checkbox'
                              disabled={checkbox === true && storeId !== item.store_id? true:false}
                              className='w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500'
                              onChange={(event) => {
                                if (event.target.checked === true) {
                                  dispatch({ type: 'SUM_PRICE', payload: item.product_price * amount[i] });
                                  setCheckedProduct([...checkedProduct, { ...item, qty: 1 }]);
                                  if (addData(i) === false) {
                                    alert('barang sudah ditambahkan');
                                  }
                                  setIsProductChecked([...isProductChecked, true]);
                                  statusTrue(i);
                                } else {
                                  dispatch({ type: 'SUB_PRICE', payload: item.product_price * amount[i] });
                                  setCheckedProduct(checkedProduct.filter((i) => i.id !== item.id));
                                  removeData(i);
                                  setIsProductChecked(isProductChecked.filter((i) => i !== true));
                                  statusFalse(i);
                                }
                              }}
                            />
                          </div>
                          <div className='relative flex-shrink-0 w-24 h-24 ml-3 overflow-hidden border border-gray-200 rounded-md'>
                            <Image
                              src={
                                item.photos.length > 0 ? item.photos[0].product_image_path : '/images/products/kol.png'
                              }
                              alt={item.product_name}
                              layout='fill'
                              className='object-cover object-center w-full h-full'
                            />
                          </div>

                          <div className='flex flex-col flex-1 ml-4'>
                            <div>
                              <div className='flex justify-between text-base font-medium text-gray-900'>
                                <h3>
                                  <a href={`/products/${item.product_slug}`}>{item.product_name}</a>
                                </h3>
                                <p className='ml-4'>{formatRupiah(item.product_price)}</p>
                              </div>
                              <p className='mt-1 text-sm text-gray-500'>
                                {item.category.category_name} - {item.sub_category.sub_category_name}
                              </p>
                            </div>
                            <div className='flex items-end justify-between flex-1 text-sm'>
                              <p className='text-gray-500'>Jumlah</p>
                              <div className='flex items-center space-x-5'>
                                <div className='flex items-center space-x-2'>
                                  <button
                                    type='button'
                                    className='p-1 disabled:text-gray-400'
                                    disabled={statusCheck[i] ? false : true}
                                    onClick={() => {
                                      dispatch({ type: 'SUB_PRICE', payload: item.product_price });
                                      if (statusCheck[i]) {
                                        minAmount(i);
                                      }
                                    }}>
                                    <AiOutlineMinusCircle className='w-5 h-5' />
                                  </button>
                                  {/* <input type='number' className='w-14 text-sm' readOnly /> */}
                                  <div>{amount[i]}</div>
                                  <div></div>
                                  <button
                                    type='button'
                                    className='p-1 disabled:text-gray-400'
                                    disabled={statusCheck[i] ? false : true}
                                    onClick={() => {
                                      dispatch({ type: 'SUM_PRICE', payload: item.product_price });
                                      if (statusCheck[i]) {
                                        addAmount(i);
                                      }
                                    }}>
                                    <AiOutlinePlusCircle className='w-5 h-5' />
                                  </button>
                                </div>
                                <button
                                  type='button'
                                  onClick={() =>
                                    // dispatch({
                                    //   type: 'REMOVE_FROM_CART',
                                    //   id: product.id,
                                    //   price: product.product_price,
                                    // })
                                    {
                                      removeItem(item.id)
                                    }
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
                        className='block w-full py-2 text-sm text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                        onClick={() => send()}>
                        Beli
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            loadingState
          )}
        </div>
        <div className='relative max-w-5xl px-4 py-12 mx-auto sm:px-6 lg:px-8'>
          <h3 className='flex items-center justify-start pb-6 space-x-3 text-xl font-semibold'>
            <span>Rekomendasi untuk kamu</span>
          </h3>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8'>
            {state.recommendation.map((data, idx) => (
              <Fragment key={idx}>
                {data.map((item, i) => (
                  <ProductCard key={i} product={item} />
                ))}
              </Fragment>
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

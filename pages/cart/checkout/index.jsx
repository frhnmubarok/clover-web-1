import { HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';

import AppLayout from '@/components/templates/AppLayout';

import { classNames, formatRupiah } from '@/utils/helpers';

import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCartContext } from '@/context/CartContext';
import { useRouter } from 'next/router';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

const Alamat = ({ data }) => {
  return (
    <div className='flex flex-col py-3 my-2 space-y-2 border-gray-200 border-y'>
      <h1 className='text-sm'>
        <span className='font-semibold'>{data.address_fullname} </span>
        <span>(Alamat {data.address_mark_as})</span>
        {data.address_primary === true ? (
          <span className='px-2 py-px ml-2 text-xs rounded bg-emerald-200 text-emerald-700'>Utama</span>
        ) : (
          ''
        )}
      </h1>
      <div className='text-sm'>{data.address_phone_number}</div>
      <p className='max-w-md text-sm'>
        {data.address_street_name +
          ', kecamatan ' +
          data.address_districts +
          ', kabupaten ' +
          data.address_city +
          ', propinsi ' +
          data.address_province +
          ', ' +
          data.address_postal_code}
      </p>
      <p className='max-w-md text-sm'>{data.address_other_detail === null ? '' : data.address_other_detail}</p>
    </div>
  );
};

const Checkout = () => {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState('');
  const { state, dispatch } = useCartContext();
  console.log(state);
  const router = useRouter();
  const [address, setAddress] = useState([]);
  const [allAddress, setAllAddress] = useState(false);
  const [allService, setAllService] = useState([]);
  const [service, setService] = useState('');
  const [cost, setCost] = useState(0);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://dev-api-clover.herokuapp.com/api/address',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    }).then((data) => {
      if (data.data.data.length < 1) {
        toast('Anda belum memiliki alamat', {
          type: 'error',
          autoClose: 2000,
        });
        router.push('/profile/settings/address');
        return;
      }
      setAddress(data.data.data);
    });

    axios({
      method: 'GET',
      url: 'https://dev-api-clover.herokuapp.com/api/courier',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    }).then((data) => {
      setCouriers(data.data.data);
    });
  }, []);

  const changeAddress = (id) => {
    console.log(id);
    axios({
      method: 'PUT',
      url: 'https://dev-api-clover.herokuapp.com/api/address',
      data: { id },
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      setAddress(data.data.data);
    });
  };
  // console.log(state.checkoutProduct.photos.length)

  useEffect(() => {
    if (state.checkoutProduct.length < 1) {
      router.push('/cart');
    }
  }, [state.checkoutProduct, router]);

  useEffect(() => {
    console.log(selectedCourier);
    let destination;
    address.map((data) => {
      if (data.address_primary === true) {
        destination = data.address_id_city;
      }
    });
    const weight = 0;
    state.checkoutProduct.forEach((data) => {
      weight += data.amount * 500;
    });
    const data = {
      destination,
      origin: state.store.store_id_city,
      weight: weight,
      courier: selectedCourier,
    };
    console.log(data);
    // console.log(state.store)
    if (selectedCourier !== '' && couriers.length > 0) {
      axios({
        method: 'POST',
        url: 'https://dev-api-clover.herokuapp.com/api/cost',
        data: data,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token'),
          'Content-Type': 'application/json',
        },
      }).then((data) => {
        setAllService(data.data.data[0].costs);
        console.log(data.data.data[0].costs);
      });
    }
  }, [selectedCourier]);

  const send = () => {
    const items = [];
    state.checkoutProduct.forEach((data) => {
      items.push({
        product_id: data.product.id,
        product_amount: data.amount,
      });
    });
    const data = {
      transaction_shipping_cost: cost + 1000,
      store_id: state.store.id,
      transaction_courier: selectedCourier,
      transaction_service: service,
      items: items,
    };
    // const data = {
    //   transaction_shipping_cost:9000,
    //   store_id:1,
    //   items:[{product_id:2,product_amount:2}],
    //   transaction_courier:'jne',
    //   transaction_service:'oke'
    // }
    console.log(data);
    axios({
      method: 'POST',
      url: 'https://dev-api-clover.herokuapp.com/api/transaction',
      data: data,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((data) => (window.location.href = data.data.data.transaction_payment_url))
      .catch((response) => console.log(response));
  };

  return (
    <div className='container relative pt-24'>
      <div className='grid grid-cols-12 gap-8'>
        <div className='col-span-8'>
          <div className='min-h-screen py-5 space-y-4'>
            <h1 className='text-2xl font-semibold'>Checkout</h1>
            <div>
              <h3 className='text-lg font-semibold'>Alamat</h3>
              {address.map((data, index) => {
                if (data.address_primary === true) {
                  return <Alamat data={data} key={index} />;
                }
              })}
              <div className='pb-2 mb-2 border-b border-gray-200'>
                <button
                  type='button'
                  className='px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg focus:bg-gray-200'
                  onClick={() => setAllAddress(!allAddress)}>
                  Pilih Alamat Lain
                </button>
              </div>
              {allAddress === true
                ? address.map((data, index) => {
                    return (
                      <div onClick={() => changeAddress(data.id)} key={index} className='cursor-pointer'>
                        <Alamat data={data} key={index} />
                      </div>
                    );
                  })
                : ''}
              <div className='pt-5'>
                <h2 className='text-xl font-semibold'>{state.store.store_name}</h2>
                <p className='text-xs'>
                  Dari{' '}
                  <span className='font-semibold'>
                    Kabupaten {state.store.store_city} - {state.store.store_province}
                  </span>
                </p>
              </div>

              <div className='pt-3'>
                <div className='flex justify-between'>
                  <div className=' basis-2/3'>
                    {state.checkoutProduct.map((data, index) => {
                      return (
                        <div key={index} className='flex items-center pt-3'>
                          <div className='relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md'>
                            <Image
                              src={data.product.photos[0].product_image_path}
                              alt={'Photo'}
                              layout='fill'
                              className='object-cover object-center w-full h-full'
                            />
                          </div>
                          <div className='flex flex-col flex-1 ml-4'>
                            <div>
                              <div className='flex justify-between text-base font-medium text-gray-900'>
                                <h3>{data.product.product_name}</h3>
                              </div>
                              <p className='py-2 text-xs'>Jumlah {data.amount} Buah</p>
                              <p className='text-sm font-semibold'>{formatRupiah(data.product.product_price)}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className='basis-1/3'>
                    <Listbox
                      value={selectedCourier}
                      onChange={(value) => {
                        setSelectedCourier(value);
                        setService('');
                        setCost(0);
                      }}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className='block text-sm font-medium text-gray-700'>
                            Jasa Pengiriman
                          </Listbox.Label>
                          <div className='mt-1 relative'>
                            <Listbox.Button className='flex items-center border border-transparent justify-between w-full px-4 py-2 text-sm text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                              <span className='flex items-center'>
                                <span className='ml-3 block truncate'>
                                  {selectedCourier === ''
                                    ? 'Pilih Ekspedisi Pengiriman'
                                    : 'Terpilih Ekspedisi ' + selectedCourier.toUpperCase()}
                                </span>
                              </span>
                              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                <SelectorIcon className='h-5 w-5 text-gray-200' aria-hidden='true' />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave='transition ease-in duration-100'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'>
                              <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                {couriers.map((item, i) => (
                                  <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'text-white bg-primary-600' : 'text-gray-900',
                                        'cursor-pointer select-none relative py-2 pl-3 pr-9',
                                      )
                                    }
                                    value={item}>
                                    {({ selected, active }) => (
                                      <>
                                        <div className='flex items-center'>
                                          <span
                                            className={classNames(
                                              selected ? 'font-semibold' : 'font-normal',
                                              'ml-3 block truncate',
                                            )}>
                                            Ekspedisi {item.toUpperCase()}
                                          </span>
                                        </div>

                                        {selected && (
                                          <span
                                            className={classNames(
                                              active ? 'text-white' : 'text-primary-500',
                                              'absolute inset-y-0 right-0 flex items-center pr-4',
                                            )}>
                                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                    <Listbox
                      value={service}
                      onChange={(value) => {
                        setService(value[0]);
                        setCost(value[1]);
                      }}>
                      {({ open }) => (
                        <>
                          <div className='mt-4 relative'>
                            <Listbox.Button className='flex items-center justify-between w-full px-4 py-2 text-sm text-white duration-200 ease-in-out rounded-lg bg-white text-gray-700 border border-gray-300 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                              <span className='flex items-center'>
                                <span className='ml-3 block truncate'>
                                  {service === '' ? 'Pilih Services' : service}
                                </span>
                              </span>
                              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                <SelectorIcon className='h-5 w-5 text-gray-200' aria-hidden='true' />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave='transition ease-in duration-100'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'>
                              <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                {allService.map((item, i) => (
                                  <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'text-white bg-primary-600' : 'text-gray-900',
                                        'cursor-pointer select-none relative py-2 pl-3 pr-9',
                                      )
                                    }
                                    value={[item.service, item.cost[0].value]}>
                                    {({ selected, active }) => (
                                      <>
                                        <div className='flex items-center'>
                                          <span
                                            className={classNames(
                                              selected ? 'font-semibold' : 'font-normal',
                                              'ml-3 block truncate',
                                            )}>
                                            {item.service} - Rp {item.cost[0].value} - est {item.cost[0].etd} hari
                                          </span>
                                        </div>

                                        {selected && (
                                          <span
                                            className={classNames(
                                              active ? 'text-white' : 'text-primary-500',
                                              'absolute inset-y-0 right-0 flex items-center pr-4',
                                            )}>
                                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                    {/* <select className='mt-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none' onChange={(e)=>{
                      let tempData = e.target.value.split(',')
                      setService(tempData[0])
                      setCost(tempData[1])
                      }}>
                      <option>Pilih Services</option>
                      {allService.map((data,index)=>(
                        <option key={index} value={[data.service , data.cost[0].value]} className='hover:bg-primary-400 hover:text-white'>{data.service} - Rp {data.cost[0].value} - est {data.cost[0].etd} hari</option>

                      ))}
                    </select> */}
                  </div>
                </div>
                <div className='flex items-center justify-between px-4 py-2 mt-3 font-semibold bg-gray-200 rounded-lg'>
                  <div>Subtotal</div>
                  <div>{formatRupiah(state.totalPrice)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full col-span-4'>
          <div className='sticky top-[120px]'>
            <div className='pb-12'>
              <div className='flex items-center justify-between'>
                <div className='w-full p-6 bg-gray-100 rounded-lg'>
                  <button className='flex items-center justify-between w-full px-4 py-3 font-semibold bg-white border border-gray-200 rounded-lg'>
                    <span>Makin hemat pakai promo</span>
                    <HiChevronRight className='w-5 h-5' />
                  </button>
                  <div className='pt-4'>
                    <h3 className='text-sm font-semibold'>Ringkasan Belanja</h3>
                    <ul className='flex flex-col py-3 space-y-1'>
                      <li className='flex items-center justify-between text-sm'>
                        <span>Total Harga ({state.checkoutProduct.length} Produk)</span>
                        <span>{formatRupiah(state.totalPrice)}</span>
                      </li>
                      <li className='flex items-center justify-between text-sm'>
                        <span>Total Ongkos Kirim</span>
                        <span>{formatRupiah(cost)}</span>
                      </li>
                      <li className='flex items-center justify-between text-sm'>
                        <span>Total Biaya Penanganan</span>
                        <span>Rp. 1.000</span>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <div className='pt-2'>
                    <div className='flex items-center justify-between text-lg font-semibold'>
                      <span>Total Tagihan</span>
                      <span className='text-primary-500'>
                        {formatRupiah(parseInt(state.totalPrice) + parseInt(cost) + 1000)}
                      </span>
                    </div>
                    <p className='py-3 text-xs font-light'>
                      Dengan mengaktifkan asuransi, Saya menyetujui{' '}
                      <span className='text-green-500'>syarat dan ketentuan yang berlaku</span>.
                    </p>
                    <button
                      className='flex items-center justify-center w-full px-4 py-3 space-x-2 text-sm font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                      onClick={() => send()}>
                      Pilih Pembayaran
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Checkout',
  },
};

export default Checkout;

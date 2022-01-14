import React, { useEffect, useState, useContext, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, MinusSmIcon } from '@heroicons/react/outline';
import { formatRupiah, orderStatus } from '@/utils/helpers';
import { badgeOrderStatus } from '@/utils/helpers';

const TransactionDetailModal = ({ open, setOpen, cancelButtonRef, data }) => {
  const badgeColor = () => {
    if (data.transaction_order_status === '1') {
      return 'bg-yellow-500';
    } else if (data.transaction_order_status === '4') {
      return 'bg-green-500';
    } else if (data.transaction_order_status === '6') {
      return 'bg-red-500';
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          onClose={setOpen}>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-2 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    {/* <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                    </div> */}
                    <div className='bg-white shadow overflow-hidden sm:rounded-lg w-full'>
                      <div className='px-4 py-5 sm:px-6'>
                        <h3 className='text-lg leading-6 font-medium text-gray-900'>Detail Transaksi</h3>
                        {/* <p className='mt-1 max-w-2xl text-sm text-gray-500'>Personal details and application.</p> */}
                      </div>
                      <div className='border-t border-gray-200'>
                        <dl>
                          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>Nama Pembeli</dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{data.user.fullname}</dd>
                          </div>
                          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>Tanggal Pembelian</dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              {data.created_at.substring(0, 10)}
                            </dd>
                          </div>
                          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>Status Pesanan</dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              <div
                                className={`inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-red-100 ${badgeOrderStatus(
                                  data.transaction_order_status,
                                )} rounded-full`}>
                                {orderStatus(data.transaction_order_status)}
                              </div>
                            </dd>
                          </div>
                          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>Status Pembayaran</dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              <div
                                className={`inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-red-100 ${
                                  data.transaction_is_paid ? 'bg-green-600' : 'bg-red-600'
                                } rounded-full`}>
                                {data.transaction_is_paid ? 'Sudah Dibayar' : 'Belum Dibayar'}
                              </div>
                            </dd>
                          </div>
                          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>Total Belanja</dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold'>
                              {formatRupiah(data.transaction_total_price)}
                            </dd>
                          </div>
                          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>Ongkos Kirim</dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              {formatRupiah(data.transaction_shipping_cost)}
                            </dd>
                          </div>
                          {/* <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>About</dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
                              consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud
                              in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit
                              deserunt qui eu.
                            </dd>
                          </div> */}
                          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>Detail Produk</dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              <ul role='list' className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                                {data.products !== null &&
                                  data?.products?.map((item, index) => (
                                    <li key={index} className='pl-3 pr-4 py-3 text-sm'>
                                      <div className='bg-gray-50 px-0 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2'>
                                        <dt className='text-sm font-medium text-gray-500'>Produk </dt>
                                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                          {item?.product?.product_name}
                                        </dd>
                                      </div>
                                      <div className='bg-gray-50 px-0 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2'>
                                        <dt className='text-sm font-medium text-gray-500'>Jumlah </dt>
                                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                          {item?.detail_transaction_amount}
                                        </dd>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}>
                    Tutup
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default TransactionDetailModal;

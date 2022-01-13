/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState, useContext, useRef, Fragment } from 'react';
import { useFormik } from 'formik';
import { Tab } from '@headlessui/react';
import { MdCheck, MdOutlineClose } from 'react-icons/md';

import { ProductContext } from '@/context/ProductContext';
import ListTable from '@/components/molecules/ListTable';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import DeleteModal from '@/components/atoms/DeleteModal';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { formatRupiah } from '@/utils/helpers';
import TransactionDetailModal from '@/components/atoms/TransactionDetailModal';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const tabName = ['Perlu Konfirmasi', 'Dikonfirmasi', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan', 'Refund'];

const AllTransactions = ({ data }) => {
  const { updateTransactionStatus, getTransactionDetail } = useContext(ProductContext);
  const [transactions, setTransactions] = useState(data.data);
  const [transactionId, setTransactionId] = useState(null);
  const [transactionDetail, setTransactionDetail] = useState({});
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (transactionId !== null) {
      const get = async () => {
        const { data } = await getTransactionDetail(transactionId);
        setTransactionDetail(data);
        console.log(data);
      };
      get();
      console.log(transactionId);
    }
  }, [transactionId]);

  const transactionType = (type) => {
    return transactions.filter((item) => item.status_pesanan === type);
  };

  const tableColumn = (body, badge) => {
    return React.useMemo(
      () => [
        {
          Header: 'No',
          accessor: '',
          Cell: (row) => {
            return <div>{parseInt(row.row.id) + 1}</div>;
          },
          disableSortBy: true,
          disableFilters: true,
        },
        {
          Header: 'Pembeli',
          accessor: 'user',
          Cell: ({ cell: { value } }) => <div className='font-semibold'>{value.username}</div>,
        },
        {
          Header: 'Ongkir',
          accessor: 'ongkir',
          Cell: ({ cell: { value } }) => formatRupiah(value),
        },
        {
          Header: 'Total Harga',
          accessor: 'total_price',
          Cell: ({ cell: { value } }) => formatRupiah(value),
        },
        {
          Header: 'Status Pesanan',
          accessor: 'status_pesanan',
          Cell: ({ value }) => (
            <div className='flex'>
              <div
                className={`inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none ${badge} text-red-100 rounded-full`}>
                {value}
              </div>
            </div>
          ),
        },
        {
          Header: 'Status Pembayaran',
          accessor: 'status_pembayaran',
          Cell: ({ value }) => (
            <div className='flex'>
              <div className='inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-red-100 bg-red-600 rounded-full'>
                {value}
              </div>
            </div>
          ),
        },
        {
          Header: 'Detail Transaksi',
          accessor: 'id',
          id: 'transactionId',
          disableSortBy: true,
          disableFilters: true,
          Cell: ({ value }) => (
            <button
              className='rounded-lg px-2 py-1 text-white text-sm bg-cyan-700 '
              onClick={() => {
                setOpen(!open);
                setTransactionId(value);
              }}>
              Lihat
            </button>
          ),
        },
        {
          Header: 'Action',
          accessor: 'id',
          disableSortBy: true,
          disableFilters: true,
          Cell: ({ value }) => (
            <div className='flex'>
              {/* <Link href='/admin/transaction/[id]' as={`/admin/transaction/${value}`}> */}
              {body !== 'pesanan dibuat' ? (
                <>
                  <p className='hidden'>{value}</p>
                </>
              ) : (
                <>
                  <div data-tip='Konfirmasi' className='tooltip'>
                    <button
                      className='text-white bg-blue-700 transition-all ease-in-out hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      onClick={() => updateTransactionStatus(value, { status_pesanan: body })}>
                      <span className='text-2xl'>
                        <MdCheck />
                      </span>
                    </button>
                  </div>
                  {body === 'pesanan dibuat' && (
                    <div data-tip='Batalkan' className='tooltip'>
                      <button className='text-white bg-red-700 transition-all ease-in-out  hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                        <span className='text-2xl'>
                          <MdOutlineClose />
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ),
        },
      ],
      [],
    );
  };

  return (
    <>
      <div className='overflow-auto h-screen pb-24 px-4 md:px-6'>
        <h1 className='text-4xl font-semibold text-gray-800 dark:text-white'>Daftar Transaksi</h1>
        {/* <h2 className='text-md text-gray-400'>
            Here&#x27;s what&#x27;s happening with your ambassador account today.
          </h2> */}
        <Tab.Group>
          <Tab.List className={'flex p-1 space-x-1 mt-6'}>
            {tabName.map((item, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow text-gray-700'
                      : 'text-gray-500 hover:bg-white/[0.6] hover:text-gray-600 transition-all ease-in-out',
                  )
                }>
                {item}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mt-2'>
            <Tab.Panel>
              <ListTable
                columns={tableColumn('pesanan dikirim', 'bg-blue-600')}
                data={transactionType('pesanan dibuat')}
              />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn(1)} data={transactionType('pesanan dikonfirmasi')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn(1)} data={transactionType('pesanan diproses')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn(1, 'bg-teal-600')} data={transactionType('pesanan dikirim')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn(1)} data={transactionType('pesanan selesai')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn(1)} data={transactionType('pesanan dibatalkan')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn(1)} data={transactionType('pesanan direfund')} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {/* <DeleteModal
          setOpen={setOpen}
          open={open}
          cancelButtonRef={cancelButtonRef}
          // handleDelete={handleDelete}
          productId={productId}
        /> */}
        <TransactionDetailModal
          setOpen={setOpen}
          open={open}
          cancelButtonRef={cancelButtonRef}
          data={transactionDetail}
        />
      </div>
    </>
  );
};

export default AllTransactions;

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

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const tabName = ['Perlu Konfirmasi', 'Dikonfirmasi', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan', 'Refund'];

const AllTransactions = ({ data }) => {
  const { updateTransactionStatus } = useContext(ProductContext);
  const [transactions, setTransactions] = useState(data.data);
  const [productId, setProductId] = useState(null);
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

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
          Header: 'Action',
          accessor: 'id',
          disableSortBy: true,
          disableFilters: true,
          Cell: ({ value }) => (
            <div className='flex'>
              <button
                className='text-white bg-blue-700 transition-all ease-in-out hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-l-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={() => updateTransactionStatus(value, { status_pesanan: body })}>
                <span className='text-2xl'>
                  <MdCheck />
                </span>
              </button>
              <button className='text-white bg-red-700 transition-all ease-in-out  hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                <span className='text-2xl'>
                  <MdOutlineClose />
                </span>
              </button>
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

        <DeleteModal
          setOpen={setOpen}
          open={open}
          cancelButtonRef={cancelButtonRef}
          // handleDelete={handleDelete}
          productId={productId}
        />
      </div>
    </>
  );
};

export default AllTransactions;

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState, useContext, useRef, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { MdCheck, MdOutlineClose } from 'react-icons/md';
import Link from '@/components/atoms/Link';

import { ProductContext } from '@/context/ProductContext';
import ListTable from '@/components/molecules/ListTable';
import { badgeOrderStatus, orderStatus } from '@/utils/helpers';
import TransactionDetailModal from '@/components/atoms/TransactionDetailModal';
import { getAllTransactionAPI } from '@/services/product';
import callAPI from '@/config/api';
import Cookies from 'js-cookie';
import UserSettingsLayout from '@/components/templates/UserSettingsLayout';
import AppLayout from '@/components/templates/AppLayout';
import toast from 'react-hot-toast';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const tabName = [
  'Perlu Dibayar',
  'Sudah Dibayar',
  'Dikonfirmasi',
  'Dikemas',
  'Dikirim',
  'Selesai',
  'Dibatalkan',
  'Refund',
];

const OrderList = () => {
  const { updateTransactionStatus, getTransactionDetail, deleteTransaction } = useContext(ProductContext);
  const [transactionId, setTransactionId] = useState(null);
  const [transactionDetail, setTransactionDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const cancelButtonRef = useRef(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const get = async () => {
      const { data } = await getTransactionDetail(transactionId);
      setTransactionDetail(data);
      setOpenDetail(true);
      console.log(data);
    };
    if (transactionId !== null) {
      get();
      console.log(transactionId);
    }
  }, [transactionId]);

  const fetchData = async () => {
    const { data } = await callAPI({
      path: '/api/transaction-user',
      method: 'GET',
      token: Cookies.get('token'),
    });
    setTransactions(data.data);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await callAPI({
        path: '/api/transaction-user',
        method: 'GET',
        token: Cookies.get('token'),
      });
      setTransactions(data.data);
    };
    fetchData();
  }, []);

  // console.log(transactions);

  // const transactionType = (type) => {
  //   return transactions.filter((item) => item.transaction_order_status === type);
  // };

  // const isPaid = (value) => {
  //   return transactions.filter((item) => item.transaction_is_paid === value);
  // };

  const filterData = (isPaid, transactionType) => {
    return transactions.filter(
      (item) => item.transaction_is_paid === isPaid && item.transaction_order_status === transactionType,
    );
  };

  const handleDone = async (id) => {
    const response = await updateTransactionStatus(id, {
      transaction_order_status: '5',
    });

    const newTransaction = await fetchData();
    // console.info(newTransaction.data);
    setTransactions(newTransaction.data);

    return response;
  };

  const tableColumn = (body, paidStatus) => {
    const newOrderStatus = parseInt(body);
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
          Header: 'Tanggal Order',
          accessor: 'created_at',
          Cell: ({ cell: { value } }) => value.substring(0, 10),
        },
        {
          Header: 'Status Pesanan',
          accessor: 'transaction_order_status',
          Cell: ({ value }) => (
            <div className='flex'>
              <div
                className={`inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none ${badgeOrderStatus(
                  value,
                )} text-red-100 rounded-full`}>
                {orderStatus(value)}
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
              className='px-2 py-1 text-sm text-white rounded-lg bg-cyan-700 '
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
          disableSortBy: true,
          disableFilters: true,
          Cell: ({ row }) => {
            return (
              <>
                {body === '1' && paidStatus === 'unpaid' && (
                  <Link
                    href={row.original.transaction_payment_url}
                    className='inline-flex items-center justify-center px-2 py-1 text-sm text-white rounded-lg bg-primary-500'>
                    Bayar
                  </Link>
                )}
                {body === '4' && (
                  <button
                    type='button'
                    onClick={() => handleDone(row.original.id)}
                    className='inline-flex items-center justify-center px-2 py-1 text-sm text-white rounded-lg bg-primary-500'>
                    Barang sudah diterima
                  </button>
                )}
              </>
            );
          },
        },
      ],
      [],
    );
  };

  return (
    <UserSettingsLayout>
      <div className='px-5 py-5 overflow-hidden'>
        <h1 className='font-semibold text-gray-800 dark:text-white'>Daftar Transaksi</h1>
        {/* <h2 className='text-gray-400 text-md'>
            Here&#x27;s what&#x27;s happening with your ambassador account today.
          </h2> */}
        <Tab.Group>
          <Tab.List className={'flex p-1 space-x-1 mt-6'}>
            {tabName.map((item, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2 text-sm leading-5 font-medium rounded-lg',
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
              <ListTable columns={tableColumn('1', 'unpaid')} data={filterData(false, '1')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('1')} data={filterData(true, '1')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('2')} data={filterData(true, '2')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('3')} data={filterData(true, '3')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('4')} data={filterData(true, '4')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('5')} data={filterData(true, '5')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('6')} data={filterData(true, '6')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('7')} data={filterData(false, '7')} />
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
        {openDetail !== false && (
          <TransactionDetailModal
            setOpen={setOpen}
            open={open}
            cancelButtonRef={cancelButtonRef}
            data={transactionDetail}
          />
        )}
      </div>
    </UserSettingsLayout>
  );
};

OrderList.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Daftar Transaksi',
  },
};

export default OrderList;

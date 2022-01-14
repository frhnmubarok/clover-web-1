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
import { badgeOrderStatus, orderStatus } from '@/utils/helpers';
import TransactionDetailModal from '@/components/atoms/TransactionDetailModal';
import { getAllTransactionAPI } from '@/services/product';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const tabName = ['Perlu Konfirmasi', 'Dikonfirmasi', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan', 'Refund'];

const AllTransactions = ({ data }) => {
  const { updateTransactionStatus, getTransactionDetail, deleteTransaction } = useContext(ProductContext);
  const [transactions, setTransactions] = useState(data.data);
  const [transactionId, setTransactionId] = useState(null);
  const [transactionDetail, setTransactionDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const cancelButtonRef = useRef(null);

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

  const transactionType = (type) => {
    return transactions.filter((item) => item.transaction_order_status === type);
  };

  const handleUpdateStatus = async (id, status) => {
    const response = await updateTransactionStatus(id, status);
    console.log(response);
    if (response.error === false) {
      const newTransactions = await getAllTransactionAPI();
      setTransactions(newTransactions.data.data);
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteTransaction(id);
    // toast.promise(deleteTransaction(id), {
    //   loading: 'Mohon tunggu...',
    //   success: 'Berhasil hapus transaksi',
    //   error: 'Gagal hapus transaksi',
    // });
    console.log(response);
    if (response.error === false) {
      const newTransactions = await getAllTransactionAPI();
      setTransactions(newTransactions.data.data);
    }
  };

  const updateButton = (id, status, text) => {
    return (
      <div data-tip='Proses Pesanan' className='tooltip'>
        <button
          className='text-white bg-blue-700 transition-all ease-in-out hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={() => handleUpdateStatus(id, { transaction_order_status: status + 1 })}>
          <span className='text-md'>{text}</span>
        </button>
      </div>
    );
  };

  const tableColumn = (body) => {
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
          Header: 'Pembeli',
          accessor: 'user',
          Cell: ({ cell: { value } }) => <div className='font-semibold'>{value.fullname}</div>,
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
          Header: 'Status Pembayaran',
          accessor: 'transaction_is_paid',
          Cell: ({ value }) => (
            <div className='flex'>
              <div
                className={`inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-red-100 ${
                  value ? 'bg-green-600' : 'bg-red-600'
                } rounded-full`}>
                {value ? 'Sudah Dibayar' : 'Belum Dibayar'}
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
              {body !== '1' ? (
                <>
                  <p className='hidden'>{value}</p>
                </>
              ) : (
                <>
                  <div data-tip='Konfirmasi' className='tooltip'>
                    <button
                      className='text-white bg-emerald-500 transition-all ease-in-out hover:bg-emerald-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-l-md text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      onClick={() => handleUpdateStatus(value, { transaction_order_status: newOrderStatus + 1 })}>
                      <span className='text-xl'>
                        <MdCheck />
                      </span>
                    </button>
                  </div>
                  {body === '1' && (
                    <div data-tip='Batalkan' className='tooltip'>
                      <button
                        className='text-white bg-red-700 transition-all ease-in-out  hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-md text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        onClick={() => handleUpdateStatus(value, { transaction_order_status: 6 })}>
                        <span className='text-xl'>
                          <MdOutlineClose />
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}
              {body == 2 && updateButton(value, newOrderStatus, 'Proses')}
              {body == 3 && updateButton(value, newOrderStatus, 'Kirim')}
              {body == 4 && updateButton(value, newOrderStatus, 'Batal')}
              {body == 6 && (
                <div data-tip='Proses Pesanan' className='tooltip'>
                  <button
                    className='text-white bg-red-600 transition-all ease-in-out hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={() => handleDelete(value)}>
                    <span className='text-md'>Hapus</span>
                  </button>
                </div>
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
              <ListTable columns={tableColumn('1')} data={transactionType('1')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('2')} data={transactionType('2')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('3')} data={transactionType('3')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('4')} data={transactionType('4')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('5')} data={transactionType('5')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('6')} data={transactionType('6')} />
            </Tab.Panel>
            <Tab.Panel>
              <ListTable columns={tableColumn('7')} data={transactionType('7')} />
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
    </>
  );
};

export default AllTransactions;

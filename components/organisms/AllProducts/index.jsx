/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState, useContext, useRef, Fragment } from 'react';
import { useFormik } from 'formik';
import { ProductContext } from '@/context/ProductContext';
import ListTable from '@/components/molecules/ListTable';
import { MdDelete, MdEdit, MdAdd } from 'react-icons/md';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import DeleteModal from '@/components/atoms/DeleteModal';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { formatRupiah } from '@/utils/helpers';

const AllProducts = ({ data }) => {
  const { deleteProduct, getProduct } = useContext(ProductContext);
  const [products, setProducts] = useState(data.data.products);
  const [productId, setProductId] = useState(null);
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  setTimeout(() => {
    if (deleteSuccessful === true) {
      const get = async () => {
        const { data } = await getProduct();
        setProducts(data.data);
        console.log(data.data);
      };
      get();
      setDeleteSuccessful(false);
    }
  }, 1000);

  const handleDelete = async (id) => {
    deleteProduct(id);
    setDeleteSuccessful(true);
  };

  const columns = React.useMemo(
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
        Header: 'Nama Produk',
        accessor: 'product_name',
        Cell: ({ cell: { value } }) => <div className='font-semibold'>{value}</div>,
      },
      {
        Header: 'Kategori',
        accessor: 'category',
        Cell: ({ value }) => value.category_name,
      },
      {
        Header: 'Sub Kategori',
        accessor: 'sub_category',
        Cell: ({ value }) => value.sub_category_name,
      },
      {
        Header: 'Harga',
        accessor: 'product_price',
        Cell: ({ cell: { value } }) => formatRupiah(value),
      },
      {
        Header: 'Stok Tersedia',
        accessor: 'product_stock',
      },
      {
        Header: 'Diskon',
        accessor: 'product_discount',
        Cell: ({ value }) => `${value}%`,
      },
      {
        Header: 'Action',
        accessor: 'id',
        disableSortBy: true,
        disableFilters: true,
        Cell: ({ value }) => (
          <div className='flex'>
            <Link href={`edit-product/${value}`}>
              <button className='inline-flex items-center px-2 py-2 rounded'>
                <span className='text-2xl text-blue-500 transition-all ease-in-out hover:text-blue-700'>
                  <MdEdit />
                </span>
              </button>
            </Link>
            <button
              className='inline-flex items-center px-2 py-2 rounded'
              onClick={() => {
                setOpen(!open);
                setProductId(value);
              }}>
              <span className='text-2xl text-red-500 transition-all ease-in-out hover:text-red-700'>
                <MdDelete />
              </span>
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <div className='min-h-screen px-4 pb-24 md:px-6'>
        <h1 className='text-4xl font-semibold text-gray-800 dark:text-white'>Daftar Produk</h1>
        {/* <h2 className='text-gray-400 text-md'>
            Here&#x27;s what&#x27;s happening with your ambassador account today.
          </h2> */}
        <div className='flex justify-end'>
          <Link href='/dashboard/add-product'>
            <a className='flex items-center justify-center p-2 text-sm font-semibold text-gray-100 transition-all ease-linear rounded-md shadow-md bg-emerald-500 hover:bg-emerald-600'>
              Tambah Produk
              <span className='ml-1 text-xl font-semibold'>
                <MdAdd />
              </span>
            </a>
          </Link>
        </div>
        <ListTable columns={columns} data={products} />

        <DeleteModal
          setOpen={setOpen}
          open={open}
          cancelButtonRef={cancelButtonRef}
          handleDelete={handleDelete}
          productId={productId}
        />
      </div>
    </>
  );
};

export default AllProducts;

import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import ProductInput from '../Atoms/ProductInput';
import { MdLogin } from 'react-icons/md';
import { ProductContext } from '@/context/ProductContext';

const validate = (values) => {
  const errors = {};

  if (!values.product_name) {
    errors.product_name = 'Wajib diisi';
  }

  if (!values.product_price) {
    errors.product_price = 'Wajib diisi';
  }

  if (!values.product_description) {
    errors.product_description = 'Wajib diisi';
  }

  if (!values.product_stock) {
    errors.product_stock = 'Wajib diisi';
  }
  if (!values.product_category_id) {
    errors.product_category_id = 'Wajib diisi';
  }

  if (values.product_discount < 0 || values.product_discount > 100) {
    errors.product_discount = 'Wajib diisi';
  }

  // if (!values.product_category_id) {
  //   errors.product_category_id = "Wajib diisi";
  // }

  return errors;
};

const AddImagePage = () => {
  const { addProductImage } = useContext(ProductContext);
  // const formik = useFormik({
  //   initialValues: {
  //     image: "",
  //   },
  //   onSubmit: (values) => {
  //     addProductImage(values, localStorage.getItem("product_id"));
  //     console.log(values);
  //   },
  // });
  const formData = new FormData();
  return (
    <div className='overflow-auto h-screen pb-24 px-4 md:px-6'>
      <h1 className='text-4xl font-semibold text-gray-800 dark:text-white'>Tambah Gambar Produk</h1>
      <h2 className='text-md text-gray-400'>Here&#x27;s what&#x27;s happening with your ambassador account today.</h2>
      <form>
        {/* <form className="pt-8"> */}
        <div className='mt-10 sm:mt-0'>
          <div className='md:grid md:grid-cols-4 md:gap-6'>
            <div className='md:col-span-1'>
              <div className='px-4 sm:px-0'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>Foto Produk</h3>
                <p className='mt-1 text-sm text-gray-600'>Silahkan tambahkan foto produk anda.</p>
              </div>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-3'>
              <div className='shadow overflow-hidden sm:rounded-md'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Cover photo</label>
                    <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                      <div className='space-y-1 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'>
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='image'
                            className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
                            <span>Upload a file</span>
                            <input
                              id='image'
                              name='image'
                              type='file'
                              className='sr-only'
                              onChange={(event) => {
                                // const files = event.target.files[0];
                                // // let myFiles = Array.from(files);
                                // formik.setFieldValue("image", files);
                                formData.append('image', event.currentTarget.files[0]);
                              }}
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                    <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                      <button
                        type='button'
                        className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={() => {
                          addProductImage(formData, localStorage.getItem('product_id'));
                        }}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div> */}
      </form>
    </div>
  );
};

const AddProducts = () => {
  const { addProduct } = useContext(ProductContext);
  const [productDataSubmitted, setProductDataSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      product_name: '',
      product_price: '',
      product_description: '',
      product_stock: '',
      product_discount: 0,
      product_category_id: 1,
      product_thumbnail: '',
    },
    validate,
    onSubmit: (values) => {
      addProduct(values);
      setProductDataSubmitted(true);
      console.log(values);
    },
  });
  return (
    <>
      {productDataSubmitted ? (
        <AddImagePage />
      ) : (
        <div className='overflow-auto h-screen pb-24 px-4 md:px-6'>
          <h1 className='text-4xl font-semibold text-gray-800 dark:text-white'>Tambah Produk</h1>
          {/* <h2 className='text-md text-gray-400'>
            Here&#x27;s what&#x27;s happening with your ambassador account today.
          </h2> */}
          <form onSubmit={formik.handleSubmit}>
            <div className='pt-8'>
              <div className='md:grid md:grid-cols-4 md:gap-6'>
                <div className='md:col-span-1'>
                  <div className='px-4 sm:px-0'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>Produk</h3>
                    <p className='mt-1 text-sm text-gray-600'>* Wajib diisi</p>
                  </div>
                </div>
                <div className='mt-5 md:mt-0 md:col-span-3'>
                  <div className='shadow-lg sm:rounded-md sm:overflow-hidden'>
                    <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                      <div className='grid grid-cols-3 gap-6'>
                        <ProductInput
                          id='product_name'
                          name='product_name'
                          type='text'
                          label='Nama Produk *'
                          handleChange={formik.handleChange}
                          value={formik.values.product_name}
                          errors={formik.errors.product_name}
                        />
                      </div>

                      <div className='grid grid-cols-3 gap-6'>
                        <ProductInput
                          id='product_price'
                          name='product_price'
                          type='text'
                          label='Harga Produk *'
                          handleChange={formik.handleChange}
                          value={formik.values.product_price}
                          errors={formik.errors.product_price}
                        />
                      </div>

                      <div>
                        <label htmlFor='product_description' className='block text-sm font-medium text-gray-700'>
                          Deskripsi Produk *
                        </label>
                        <div className='mt-1'>
                          <textarea
                            id='product_description'
                            name='product_description'
                            rows={3}
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                            onChange={formik.handleChange}
                            value={formik.values.product_description}
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>Beri deskripsi yang lengkap tentang produk anda.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='hidden sm:block' aria-hidden='true'>
              <div className='py-5'>
                <div className='border-t border-gray-200' />
              </div>
            </div>

            {/* <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-4 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Foto Produk
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Silahkan tambahkan foto produk anda.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-3">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="product_thumbnail"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="product_thumbnail"
                              name="product_thumbnail"
                              type="file"
                              className="sr-only"
                              onChange={(event) => {
                                const files = event.target.files;
                                let myFiles = Array.from(files);
                                formik.setFieldValue(
                                  "product_thumbnail",
                                  myFiles
                                );
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

            {/* <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div> */}

            <div className=''>
              <div className='md:grid md:grid-cols-4 md:gap-6'>
                <div className='md:col-span-1'>
                  <div className='px-4 sm:px-0'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>Detail Produk</h3>
                    <p className='mt-1 text-sm text-gray-600'>* Wajib diisi</p>
                  </div>
                </div>
                <div className='mt-5 md:mt-0 md:col-span-3'>
                  <div className='shadow-lg sm:rounded-md sm:overflow-hidden'>
                    <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                      <div className='grid grid-cols-3 gap-6'>
                        <ProductInput
                          id='product_stock'
                          name='product_stock'
                          type='number'
                          label='Stok Produk *'
                          handleChange={formik.handleChange}
                          value={formik.values.product_stock}
                          errors={formik.errors.product_stock}
                        />
                      </div>

                      <div className='grid grid-cols-3 gap-6'>
                        <div className='col-span-3 sm:col-span-3'>
                          <label htmlFor='product_category_id' className='block text-sm font-medium text-gray-700'>
                            Kategori Produk *
                          </label>
                          <div className='mt-1 flex rounded-md shadow-sm'>
                            <div className='relative inline-block w-full text-gray-700'>
                              <select
                                className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300'
                                placeholder='Regular input'
                                name='product_category_id'
                                id='product_category_id'
                                onChange={formik.handleChange}
                                value={formik.values.product_category_id}>
                                <option value={1}>Buah</option>
                                <option value={2}>Sayuran</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='grid grid-cols-3 gap-6'>
                        <ProductInput
                          id='product_discount'
                          name='product_discount'
                          type='number'
                          label='Diskon Produk *'
                          handleChange={formik.handleChange}
                          value={formik.values.product_discount}
                          errors={formik.errors.product_discount}
                        />
                      </div>
                    </div>
                    <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                      <button
                        type='submit'
                        className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProducts;

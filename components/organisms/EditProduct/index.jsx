import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
// import ProductInput from '../atoms/ProductInput';
import ProductInput from '@/components/atoms/ProductInput';
import { MdLogin } from 'react-icons/md';
import { ProductContext } from '@/context/ProductContext';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

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

  if (values.product_discount < 0 || values.product_discount > 100) {
    errors.product_discount = 'Wajib diisi';
  }

  // if (!values.product_category_id) {
  //   errors.product_category_id = "Wajib diisi";
  // }

  return errors;
};

const EditProduct = () => {
  const router = useRouter();
  const { getProductById, updateProduct } = useContext(ProductContext);
  const [productDataSubmitted, setProductDataSubmitted] = useState(false);
  const [productById, setProductById] = useState({});
  const formik = useFormik({
    initialValues: {
      product_name: productById.product_name,
      product_price: productById.product_price,
      product_description: productById.product_description,
      product_stock: productById.product_stock,
      product_discount: productById.product_discount,
    },
    validate,
    onSubmit: (values) => {
      toast.promise(updateProduct(values, router.query.id), {
        loading: 'Mohon tunggu...',
        success: 'Produk berhasil diupdate!',
        error: <b>Mohon maaf, telah terjadi kesalahan. Mohon coba lagi.</b>,
      });
      router.back();
      setProductDataSubmitted(true);
    },
  });

  useEffect(() => {
    const getProductIdParams = async () => {
      const productId = await getProductById(router.query.id);
      console.log(productId);
      const set = await setProductById(productId.data);
      return set;
      // console.log(productId.data);
    };
    getProductIdParams();
  }, []);

  useEffect(() => {
    if (productById !== {}) {
      formik.setFieldValue('product_name', productById.product_name);
      formik.setFieldValue('product_price', productById.product_price);
      formik.setFieldValue('product_description', productById.product_description);
      formik.setFieldValue('product_stock', productById.product_stock);
      formik.setFieldValue('product_discount', productById.product_discount);
    }
  }, [productById]);

  return (
    <>
      <div className='overflow-auto h-screen pb-24 px-4 md:px-6'>
        <h1 className='text-4xl font-semibold text-gray-800 dark:text-white'>Ubah Produk</h1>
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
                    {/* <div className='grid grid-cols-3 gap-6'>
                      <div className='col-span-3 sm:col-span-3'>
                        <label htmlFor='product_category_id' className='block text-sm font-semibold text-gray-700'>
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
                              <option value={1}>Hidroponik</option>
                              <option value={2}>Non Hidroponik</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-3 gap-6'>
                      <div className='col-span-3 sm:col-span-3'>
                        <label htmlFor='product_category_id' className='block text-sm font-semibold text-gray-700'>
                          Sub Kategori Produk *
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <div className='relative inline-block w-full text-gray-700'>
                            <select
                              className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300'
                              placeholder='Regular input'
                              name='product_sub_category_id'
                              id='product_sub_category_id'
                              onChange={formik.handleChange}
                              value={formik.values.product_sub_category_id}>
                              <option value={1}>Buah</option>
                              <option value={2}>Sayuran</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div> */}
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
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;

/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import { MdLogin } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import { AuthContext } from 'context/AuthContext';
// import { KYCContext } from '@/context/KYCContext';
import { ProductContext } from '@/context/ProductContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';
import TextArea from '@/components/atoms/TextArea';

const validate = (values) => {
  const errors = {};

  if (!values.store_name) {
    errors.store_name = 'Wajib diisi';
  }
  if (!values.store_description) {
    errors.store_description = 'Wajib diisi';
  } else if (values.store_description.length < 20) {
    errors.store_description = 'Deskripsi toko minimal 20 karakter';
  }

  return errors;
};

const CreateStore = () => {
  const { createStore } = useContext(ProductContext);

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  const formik = useFormik({
    initialValues: {
      store_name: '',
      store_description: '',
    },
    validate,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('store_name', values.store_name);
      formData.append('store_description', values.store_description);
      formData.append('store_image_profile', values.store_image_profile);
      createStore(formData);
      console.log(formData);
    },
  });

  return (
    <AuthLayout formImage formLabel='Pendaftaran Toko'>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id='store_name'
          name='store_name'
          type='text'
          label='Nama Toko'
          handleChange={formik.handleChange}
          value={formik.values.store_name}
          placeholder='Masukkan nama toko'
          errors={formik.errors.store_name}
        />
        {/* <Input
          id='store_description'
          name='store_description'
          type='text'
          label='Deskripsi Toko'
          handleChange={formik.handleChange}
          value={formik.values.store_description}
          placeholder='Masukkan nama toko'
          errors={formik.errors.store_description}
        /> */}

        <TextArea
          id='store_description'
          name='store_description'
          type='text'
          label='Deskripsi Toko'
          handleChange={formik.handleChange}
          value={formik.values.store_description}
          placeholder='Masukkan deskripsi toko'
          errors={formik.errors.store_description}
        />
        <div className='my-4'>
          <label className='text-sm font-medium text-gray-700 tracking-wide'>Foto Toko</label>

          <div className='m-4'>
            <div className='flex items-center justify-center w-full'>
              <label className='flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300'>
                <div className='flex flex-col items-center justify-center pt-7'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-12 h-12 text-gray-400 group-hover:text-gray-600'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>Pilih foto</p>
                </div>
                <input
                  id='store_image_profile'
                  name='store_image_profile'
                  type='file'
                  className='opacity-0'
                  onChange={(event) => formik.setFieldValue('store_image_profile', event.currentTarget.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
        <div classNameName='mt-6 flex justify-between content-center items-center'>
          <span></span>
          <AuthButton icon={<MdLogin />} isLoading>
            Daftar
          </AuthButton>
          {/* <button
            type='button'
            className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={() => {
              console.log(formData);
            }}>
            Save
          </button> */}
        </div>
      </form>
    </AuthLayout>
  );
};

export default CreateStore;

import React, { useContext } from 'react';
import { useFormik } from 'formik';

import AuthLayout from '@/components/templates/AuthLayout';
import Input from '@/components/atoms/Input';
import Checkbox from '@/components/atoms/Checkbox';
import AuthButton from '@/components/atoms/AuthButton';
import { MdLogin } from 'react-icons/md';
import { KYCContext } from '@/context/KYCContext';

const validate = (values) => {
  const errors = {};

  if (!values.standard_store_category) {
    errors.standard_store_category = 'Wajib diisi';
  }
  if (!values.standard_store_min_product) {
    errors.standard_store_min_product = 'Wajib diisi';
  }
  if (!values.standard_store_min_quantity) {
    errors.standard_store_min_quantity = 'Wajib diisi';
  }
  if (!values.standard_store_term_and_condition) {
    errors.standard_store_term_and_condition = 'Wajib diisi';
  }

  // if (!values.profile_ktp) {
  //   errors.profile_ktp = 'Wajib diisi';
  // } else if (values.profile_ktp.length < 16) {
  //   errors.profile_ktp = 'KTP harus 16 digit';
  // }

  // if (!values.profile_address) {
  //   errors.profile_address = 'Wajib diisi';
  // }

  // if (!values.profile_city) {
  //   errors.profile_city = 'Wajib diisi';
  // }

  // if (!values.profile_postal_code) {
  //   errors.profile_postal_code = 'Wajib diisi';
  // } else if (values.profile_postal_code.length < 5) {
  //   errors.profile_postal_code = 'Kode pos harus 5 digit';
  // }

  // if (!values.profile_place_of_birth) {
  //   errors.profile_place_of_birth = 'Wajib diisi';
  // }

  // if (!values.profile_gender) {
  //   errors.profile_gender = 'Wajib diisi';
  // }

  return errors;
};

export default function StoreDetails() {
  const { reviewKYC, registerKYC } = useContext(KYCContext);
  const formik = useFormik({
    initialValues: {
      standard_store_min_product: false,
      standard_store_min_quantity: false,
      standard_store_term_and_condition: false,
    },
    validate,
    onSubmit: (values) => {
      const form = new FormData();
      form.append('standard_store_category', values.standard_store_category.toString());
      form.append('standard_store_min_product', values.standard_store_min_product);
      form.append('standard_store_min_quantity', values.standard_store_min_quantity);
      form.append('standard_store_term_and_condition', values.standard_store_term_and_condition);
      form.append('standard_store_product_photo', values.standard_store_product_photo);
      reviewKYC(form);
      console.log({ ...values, standard_store_category: values.standard_store_category.toString() });
    },
  });
  return (
    <AuthLayout formImage formLabel='Pendaftaran Mitra'>
      <div className='flex flex-col items-center justify-center w-full'>
        <ul className='w-full steps bg-transparent'>
          <li className='step step-primary '>Data Diri</li>
          <li className='step step-primary'>Persyaratan Mitra</li>
          <li className='step text-gray-400'>Konfirmasi</li>
        </ul>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <p className='text-lg font-medium text-gray-700 tracking-wide mt-4'>Kategori :</p>
          <Checkbox
            id='standard_store_category'
            name='standard_store_category'
            label='Hidroponik'
            handleChange={formik.handleChange}
            value={1}
          />
          <Checkbox
            id='standard_store_category'
            name='standard_store_category'
            label='Non Hidroponik'
            handleChange={formik.handleChange}
            value={2}
          />
        </div>
        <div>
          <p className='text-lg font-medium text-gray-700 tracking-wide mt-4'>
            Untuk kenyamanan bersama, penjual harus setuju untuk menjual minimal 3 jenis item yang berbeda dari kategori
            yang dipilih{' '}
          </p>
          <Checkbox
            id='standard_store_min_product'
            name='standard_store_min_product'
            label='Setuju'
            handleChange={formik.handleChange}
            value={formik.values.standard_store_min_product}
          />
        </div>
        <div>
          <p className='text-lg font-medium text-gray-700 tracking-wide mt-4'>
            Untuk kenyamanan bersama, penjual harus setuju untuk menyediakan minimal 10 produk per harinya untuk dijual
          </p>
          <Checkbox
            id='standard_store_min_quantity'
            name='standard_store_min_quantity'
            label='Setuju'
            handleChange={formik.handleChange}
            value={formik.values.standard_store_min_quantity}
          />
        </div>
        <div className='my-4'>
          <label className='text-sm font-medium text-gray-700 tracking-wide'>Foto Produk</label>
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
                  id='standard_store_product_photo'
                  name='standard_store_product_photo'
                  type='file'
                  className='opacity-0'
                  onChange={(event) =>
                    formik.setFieldValue('standard_store_product_photo', event.currentTarget.files[0])
                  }
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          <p className='text-lg font-medium text-gray-700 tracking-wide mt-4'>
            Saya menyetujui semua persyaratan yang diminta oleh pihak Clover
          </p>
          <Checkbox
            id='standard_store_term_and_condition'
            name='standard_store_term_and_condition'
            label='Setuju'
            handleChange={formik.handleChange}
            value={formik.values.standard_store_term_and_condition}
          />
        </div>
        <div className='mt-6 flex justify-between content-center items-center'>
          <AuthButton icon={<MdLogin />} isLoading>
            Daftar
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}

import React from 'react';
import { useFormik } from 'formik';

import AuthLayout from '@/components/templates/AuthLayout';
import Input from '@/components/atoms/Input';

const validate = (values) => {
  const errors = {};

  if (!values.profile_name) {
    errors.profile_name = 'Wajib diisi';
  }

  if (!values.profile_ktp) {
    errors.profile_ktp = 'Wajib diisi';
  } else if (values.profile_ktp.length < 16) {
    errors.profile_ktp = 'KTP harus 16 digit';
  }

  if (!values.profile_address) {
    errors.profile_address = 'Wajib diisi';
  }

  if (!values.profile_city) {
    errors.profile_city = 'Wajib diisi';
  }

  if (!values.profile_postal_code) {
    errors.profile_postal_code = 'Wajib diisi';
  } else if (values.profile_postal_code.length < 5) {
    errors.profile_postal_code = 'Kode pos harus 5 digit';
  }

  if (!values.profile_place_of_birth) {
    errors.profile_place_of_birth = 'Wajib diisi';
  }

  if (!values.profile_gender) {
    errors.profile_gender = 'Wajib diisi';
  }

  return errors;
};

export default function StoreDetails() {
  const formik = useFormik({
    initialValues: {
      profile_name: '',
      profile_ktp: '',
      profile_address: '',
      profile_city: '',
      profile_postal_code: '',
      profile_place_of_birth: '',
      profile_date_of_birth: '',
      profile_gender: 'Laki-laki',
    },
    validate,
    onSubmit: (values) => {
      // registerKYC({ ...values, profile_date_of_birth: startDate.toISOString().split('T')[0] });
      // console.log({ ...values, profile_date_of_birth: startDate.toISOString().split('T')[0] });
      // setNextStep(true);
      // const formData = new FormData();
      // formData.append('profile_name', values.profile_name);
      // formData.append('profile_ktp', values.profile_ktp);
      // formData.append('profile_address', values.profile_address);
      // formData.append('profile_province', values.profile_province);
      // formData.append('profile_province_id', values.profile_province_id);
      // formData.append('profile_city', values.profile_city);
      // formData.append('profile_city_id', values.profile_city_id);
      // formData.append('profile_postal_code', values.profile_postal_code);
      // formData.append('profile_place_of_birth', values.profile_place_of_birth);
      // formData.append('profile_date_of_birth', startDate.toISOString().split('T')[0]);
      // formData.append('profile_gender', values.profile_gender);
      // formData.append('self_photo', values.self_photo);
      // formData.append('ktp_photo', values.ktp_photo);
      // console.log(formData);
      // registerKYC(formData);
      // setDataDiri(formData);
    },
  });
  return (
    <AuthLayout formImage formLabel='Pendaftaran Mitra'>
      <div classNameName='flex flex-col items-center justify-center w-full'>
        <ul classNameName='w-full steps bg-transparent'>
          <li classNameName='step step-primary '>Data Diri</li>
          <li classNameName='step step-primary'>Data Toko</li>
          <li classNameName='step text-gray-400'>Konfirmasi</li>
        </ul>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div classNameName='space-y-2 mt-2'>
          <label classNameName='text-sm font-medium text-gray-700 tracking-wide'>Kategori Produk</label>
          <div className='flex justify-center'>
            <div>
              <div className='form-check'>
                <input
                  className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault'
                />
                <label className='form-check-label inline-block text-gray-800' htmlFor='flexCheckDefault'>
                  Default checkbox
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  type='checkbox'
                  value=''
                  id='flexCheckChecked'
                  checked
                />
                <label className='form-check-label inline-block text-gray-800' htmlFor='flexCheckChecked'>
                  Checked checkbox
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

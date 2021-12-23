/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import { MdLogin } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import { AuthContext } from 'context/AuthContext';
import { KYCContext } from '@/context/KYCContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';
import TextArea from '@/components/atoms/TextArea';

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

const RegisterPartner = () => {
  const { registerKYC } = useContext(KYCContext);
  const [startDate, setStartDate] = useState(new Date());

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
      registerKYC({ ...values, profile_date_of_birth: startDate.toISOString().split('T')[0] });

      console.log({ ...values, profile_date_of_birth: startDate });
    },
  });

  return (
    <AuthLayout formImage formLabel='Pendaftaran Mitra'>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id='profile_name'
          name='profile_name'
          type='text'
          label='Nama Lengkap'
          handleChange={formik.handleChange}
          value={formik.values.profile_name}
          placeholder='Masukkan nama lengkap'
          errors={formik.errors.profile_name}
        />

        <Input
          id='profile_ktp'
          name='profile_ktp'
          type='text'
          label='NIK'
          handleChange={formik.handleChange}
          value={formik.values.profile_ktp}
          placeholder='Masukkan NIK'
          errors={formik.errors.profile_ktp}
        />

        <TextArea
          id='profile_address'
          name='profile_address'
          type='text'
          label='Alamat'
          handleChange={formik.handleChange}
          value={formik.values.profile_address}
          placeholder='Masukkan alamat lengkap'
          errors={formik.errors.profile_address}
        />

        <Input
          id='profile_city'
          name='profile_city'
          type='text'
          label='Kota Asal'
          handleChange={formik.handleChange}
          value={formik.values.profile_city}
          placeholder='Masukkan kota asal'
          errors={formik.errors.profile_city}
        />

        <Input
          id='profile_postal_code'
          name='profile_postal_code'
          type='text'
          label='Kode Pos'
          handleChange={formik.handleChange}
          value={formik.values.profile_postal_code}
          placeholder='Masukkan kode pos'
          errors={formik.errors.profile_postal_code}
        />

        <Input
          id='profile_place_of_birth'
          name='profile_place_of_birth'
          type='text'
          label='Tempat Lahir'
          handleChange={formik.handleChange}
          value={formik.values.profile_place_of_birth}
          placeholder='Masukkan tempat lahir'
          errors={formik.errors.profile_place_of_birth}
        />
        <div className='space-y-2 mt-2'>
          <label className='text-sm font-medium text-gray-700 tracking-wide'>Tanggal Lahir</label>
          <DatePicker
            className='w-full text-base px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 shadow-md'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
        </div>

        <div className='relative mt-2'>
          <label className='text-sm font-medium text-gray-700 tracking-wide'>Jenis Kelamin</label>
          <select
            className='w-full text-gray-700 text-base bg-white px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 shadow-md'
            name='profile_gender'
            id='profile_gender'
            onChange={formik.handleChange}
            value={formik.values.profile_gender}>
            <option value={'Laki-laki'} selected>
              Laki-laki
            </option>
            <option value={'Perempuan'}>Perempuan</option>
          </select>
        </div>
        <div className='mt-6 flex justify-between content-center items-center'>
          <AuthButton icon={<MdLogin />} isLoading>
            Daftar
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPartner;

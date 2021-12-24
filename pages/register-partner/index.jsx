/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import { MdLogin } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';

// import { AuthContext } from 'context/AuthContext';
import { KYCContext } from '@/context/KYCContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';
import TextArea from '@/components/atoms/TextArea';
import { callRajaOngkirAPI } from '@/config/api';
import StoreDetails from '@/components/organisms/StoreDetails';

const token = Cookies.get('token');

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

const RegisterPartner = ({ data }) => {
  const { registerKYC, dataDiri, setDataDiri } = useContext(KYCContext);
  const [startDate, setStartDate] = useState(new Date());
  const [province, setProvince] = useState(data.rajaongkir.results);
  const [provinceId, setProvinceId] = useState(null);
  const [city, setCity] = useState([]);
  const [nextStep, setNextStep] = useState(true);

  useEffect(() => {
    if (provinceId !== null) {
      async function fetchData() {
        const { data } = await callRajaOngkirAPI({
          url: `https://dev-api-clover.herokuapp.com/api/city/${provinceId}`,
          method: 'GET',
          token,
        });
        setCity(data.data);
        console.log(data);
      }
      fetchData();
    }
  }, [provinceId]);

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

      console.log({ ...values, profile_date_of_birth: startDate.toISOString().split('T')[0] });
      setNextStep(true);
      const formData = new FormData();
      formData.append('profile_name', values.profile_name);
      formData.append('profile_ktp', values.profile_ktp);
      formData.append('profile_address', values.profile_address);
      formData.append('profile_province', values.profile_province);
      formData.append('profile_province_id', values.profile_province_id);
      formData.append('profile_city', values.profile_city);
      formData.append('profile_city_id', values.profile_city_id);
      formData.append('profile_postal_code', values.profile_postal_code);
      formData.append('profile_place_of_birth', values.profile_place_of_birth);
      formData.append('profile_date_of_birth', startDate.toISOString().split('T')[0]);
      formData.append('profile_gender', values.profile_gender);
      formData.append('self_photo', values.self_photo);
      formData.append('ktp_photo', values.ktp_photo);
      console.log(formData);
      // registerKYC(formData);
      setDataDiri(formData);
    },
  });

  return (
    <>
      {nextStep ? (
        <StoreDetails />
      ) : (
        <AuthLayout formImage formLabel='Pendaftaran Mitra'>
          <div className='flex flex-col items-center justify-center w-full'>
            <ul className='w-full steps bg-transparent'>
              <li className='step step-primary '>Data Diri</li>
              <li className='step text-gray-400'>Data Toko</li>
              <li className='step text-gray-400'>Konfirmasi</li>
            </ul>
          </div>

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

            <div className='relative mt-2'>
              <label className='text-sm font-medium text-gray-700 tracking-wide'>Provinsi Asal</label>
              <select
                className='w-full text-gray-700 text-base bg-white px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 shadow-md'
                name='profile_province'
                id='profile_province'>
                {province.map((item) => (
                  <option
                    key={item.province_id}
                    value={item.province}
                    onClick={() => {
                      formik.setFieldValue('profile_province', item.province);
                      formik.setFieldValue('profile_province_id', item.province_id);
                      setProvinceId(item.province_id);
                    }}>
                    {item.province}
                  </option>
                ))}
              </select>
            </div>

            {provinceId !== null && (
              <div className='relative mt-2'>
                <label className='text-sm font-medium text-gray-700 tracking-wide'>Kota Asal</label>
                <select
                  className='w-full text-gray-700 text-base bg-white px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 shadow-md'
                  name='profile_city'
                  id='profile_city'
                  onChange={formik.handleChange}
                  value={formik.values.profile_city}>
                  {city.map((item) => (
                    <option
                      key={item.city_id}
                      value={item.city_name}
                      onClick={() => {
                        formik.setFieldValue('profile_city', item.city_name);
                        formik.setFieldValue('profile_city_id', item.city_id);
                      }}>
                      {item.city_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* <Input
          id='profile_city'
          name='profile_city'
          type='text'
          label='Kota Asal'
          handleChange={formik.handleChange}
          value={formik.values.profile_city}
          placeholder='Masukkan kota asal'
          errors={formik.errors.profile_city}
        /> */}

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

            <div className='my-4'>
              <label className='text-sm font-medium text-gray-700 tracking-wide'>Foto/Scan KTP</label>
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
                      id='ktp_photo'
                      name='ktp_photo'
                      type='file'
                      className='opacity-0'
                      onChange={(event) => formik.setFieldValue('ktp_photo', event.currentTarget.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className='my-4'>
              <label className='text-sm font-medium text-gray-700 tracking-wide'>Foto Selfie</label>
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
                      id='self_photo'
                      name='self_photo'
                      type='file'
                      className='opacity-0'
                      onChange={(event) => formik.setFieldValue('self_photo', event.currentTarget.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='mt-6 flex justify-between content-center items-center'>
              <AuthButton icon={<MdLogin />} isLoading>
                Daftar
              </AuthButton>
            </div>
          </form>
        </AuthLayout>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await callRajaOngkirAPI({
    url: 'https://api.rajaongkir.com/starter/province',
    method: 'GET',
  });

  return {
    props: {
      data,
    },
  };
};

export default RegisterPartner;

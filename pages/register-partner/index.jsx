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
import toast from 'react-hot-toast';

const token = Cookies.get('token');

const validate = (values) => {
  const errors = {};

  if (!values.kyc_name) {
    errors.kyc_name = 'Wajib diisi';
  }

  if (!values.kyc_ktp) {
    errors.kyc_ktp = 'Wajib diisi';
  } else if (values.kyc_ktp.length !== 16) {
    errors.kyc_ktp = 'KTP harus 16 digit';
  }

  if (!values.kyc_address) {
    errors.kyc_address = 'Wajib diisi';
  }

  if (!values.kyc_city) {
    errors.kyc_city = 'Wajib diisi';
  }

  if (!values.kyc_postal_code) {
    errors.kyc_postal_code = 'Wajib diisi';
  } else if (values.kyc_postal_code.length !== 5) {
    errors.kyc_postal_code = 'Kode pos harus 5 digit';
  }

  if (!values.kyc_place_of_birth) {
    errors.kyc_place_of_birth = 'Wajib diisi';
  }

  if (!values.kyc_gender) {
    errors.kyc_gender = 'Wajib diisi';
  }

  return errors;
};

const RegisterPartner = ({ data }) => {
  const { registerKYC, dataDiri, setDataDiri } = useContext(KYCContext);
  const [startDate, setStartDate] = useState(new Date());
  const [province, setProvince] = useState(data.data);
  const [provinceId, setProvinceId] = useState(null);
  const [city, setCity] = useState([]);
  const [nextStep, setNextStep] = useState(false);

  const formik = useFormik({
    initialValues: {
      kyc_name: '',
      kyc_ktp: '',
      kyc_address: '',
      kyc_city: '',
      kyc_postal_code: '',
      kyc_place_of_birth: '',
      kyc_date_of_birth: '',
      kyc_gender: 'Laki-laki',
    },
    validate,
    onSubmit: (values) => {
      // registerKYC({ ...values, kyc_date_of_birth: startDate.toISOString().split('T')[0] });

      console.log({ ...values, kyc_date_of_birth: startDate.toISOString().split('T')[0] });
      const form = new FormData();
      form.append('kyc_name', values.kyc_name);
      form.append('kyc_ktp', values.kyc_ktp);
      form.append('kyc_address', values.kyc_address);
      form.append('kyc_province', values.kyc_province);
      form.append('kyc_province_id', values.kyc_province_id);
      form.append('kyc_city', values.kyc_city);
      form.append('kyc_city_id', values.kyc_city_id);
      form.append('kyc_postal_code', values.kyc_postal_code);
      form.append('kyc_place_of_birth', values.kyc_place_of_birth);
      form.append('kyc_date_of_birth', startDate.toISOString().split('T')[0]);
      form.append('kyc_gender', values.kyc_gender);
      form.append('kyc_self_photo', values.kyc_self_photo);
      form.append('kyc_ktp_photo', values.kyc_ktp_photo);
      console.log(form);
      registerKYC(form)
        .then(() => {
          setNextStep(true);
          setDataDiri(form);
        })
        .catch((err) => {
          // toast.error(err);
          console.log(err);
        });
    },
  });

  useEffect(() => {
    if (provinceId !== null) {
      async function fetchData() {
        const { data } = await callRajaOngkirAPI({
          path: `/api/city/${provinceId}`,
          method: 'GET',
          token,
        });
        setCity(data.data);
        console.log(data);
      }
      fetchData();
    }
  }, [provinceId]);

  // setTimeout(() => {
  //   if (provinceId !== null) {
  //     async function fetchData() {
  //       const { data } = await callRajaOngkirAPI({
  //         path: `/api/city/${provinceId}`,
  //         method: 'GET',
  //         token,
  //       });
  //       setCity(data.data);
  //       console.log(data);
  //       setProvinceId(null);
  //     }
  //     fetchData();
  //   }
  // }, 1000);

  const handleOnChange = (ev) => {
    console.log(ev.target.value);
    setProvinceId(ev.target.value);
  };

  return (
    <>
      {nextStep ? (
        <StoreDetails />
      ) : (
        <AuthLayout formImage formLabel='Pendaftaran Mitra'>
          <div className='flex flex-col items-center justify-center w-full'>
            <ul className='w-full bg-transparent steps'>
              <li className='step step-primary '>Data Diri</li>
              <li className='text-gray-400 step'>Persyaratan Mitra</li>
            </ul>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <Input
              id='kyc_name'
              name='kyc_name'
              type='text'
              label='Nama Lengkap'
              handleChange={formik.handleChange}
              value={formik.values.kyc_name}
              placeholder='Masukkan nama lengkap'
              errors={formik.errors.kyc_name}
            />

            <Input
              id='kyc_ktp'
              name='kyc_ktp'
              type='text'
              label='NIK'
              handleChange={formik.handleChange}
              value={formik.values.kyc_ktp}
              placeholder='Masukkan NIK'
              errors={formik.errors.kyc_ktp}
            />

            <TextArea
              id='kyc_address'
              name='kyc_address'
              type='text'
              label='Alamat'
              handleChange={formik.handleChange}
              value={formik.values.kyc_address}
              placeholder='Masukkan alamat lengkap'
              errors={formik.errors.kyc_address}
            />

            <div className='relative mt-2'>
              <label className='text-sm font-medium tracking-wide text-gray-700'>Provinsi Asal</label>
              <select
                className='w-full px-4 py-3 text-base duration-200 ease-in-out border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                name='kyc_province'
                id='kyc_province'
                onChange={handleOnChange}
                // value={formik.values.kyc_province}
              >
                {province.map((item) => (
                  <option
                    key={item.province_id}
                    value={item.province_id}
                    onClick={() => {
                      formik.setFieldValue('kyc_province', item.province);
                      formik.setFieldValue('kyc_province_id', item.province_id);
                    }}>
                    {item.province}
                  </option>
                ))}
              </select>
            </div>

            {provinceId && (
              <div className='relative mt-2'>
                <label className='text-sm font-medium tracking-wide text-gray-700'>Kota Asal</label>
                <select
                  className='w-full px-4 py-3 text-base duration-200 ease-in-out border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                  name='kyc_city'
                  id='kyc_city'
                  onChange={formik.handleChange}
                  value={formik.values.kyc_city}>
                  {city.map((item) => (
                    <option
                      key={item.city_id}
                      value={item.city_name}
                      onClick={() => {
                        formik.setFieldValue('kyc_city', item.city_name);
                        formik.setFieldValue('kyc_city_id', item.city_id);
                      }}>
                      {`${item.type} ${item.city_name}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* <Input
          id='kyc_city'
          name='kyc_city'
          type='text'
          label='Kota Asal'
          handleChange={formik.handleChange}
          value={formik.values.kyc_city}
          placeholder='Masukkan kota asal'
          errors={formik.errors.kyc_city}
        /> */}

            <Input
              id='kyc_postal_code'
              name='kyc_postal_code'
              type='text'
              label='Kode Pos'
              handleChange={formik.handleChange}
              value={formik.values.kyc_postal_code}
              placeholder='Masukkan kode pos'
              errors={formik.errors.kyc_postal_code}
            />

            <Input
              id='kyc_place_of_birth'
              name='kyc_place_of_birth'
              type='text'
              label='Tempat Lahir'
              handleChange={formik.handleChange}
              value={formik.values.kyc_place_of_birth}
              placeholder='Masukkan tempat lahir'
              errors={formik.errors.kyc_place_of_birth}
            />
            <div className='mt-2 space-y-2'>
              <label className='text-sm font-medium tracking-wide text-gray-700'>Tanggal Lahir</label>
              <DatePicker
                className='w-full px-4 py-3 text-base duration-200 ease-in-out border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
              />
            </div>

            <div className='relative mt-2'>
              <label className='text-sm font-medium tracking-wide text-gray-700'>Jenis Kelamin</label>
              <select
                className='w-full px-4 py-3 text-base duration-200 ease-in-out border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                name='kyc_gender'
                id='kyc_gender'
                onChange={formik.handleChange}
                value={formik.values.kyc_gender}>
                <option value={'Laki-laki'} defaultValue={'Laki-laki'}>
                  Laki-laki
                </option>
                <option value={'Perempuan'}>Perempuan</option>
              </select>
            </div>

            <div className='my-4'>
              <label className='text-sm font-medium tracking-wide text-gray-700'>Foto/Scan KTP</label>
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
                      id='kyc_ktp_photo'
                      name='kyc_ktp_photo'
                      type='file'
                      className='opacity-0'
                      onChange={(event) => formik.setFieldValue('kyc_ktp_photo', event.currentTarget.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className='my-4'>
              <label className='text-sm font-medium tracking-wide text-gray-700'>Foto Selfie</label>
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
                      id='kyc_self_photo'
                      name='kyc_self_photo'
                      type='file'
                      className='opacity-0'
                      onChange={(event) => formik.setFieldValue('kyc_self_photo', event.currentTarget.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='flex items-center content-center justify-between mt-6'>
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
    path: '/api/province',
    method: 'GET',
  });

  return {
    props: {
      data,
    },
  };
};

export default RegisterPartner;

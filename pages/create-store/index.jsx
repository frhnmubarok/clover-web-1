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
import { callRajaOngkirAPI } from '@/config/api';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const validate = (values) => {
  const errors = {};

  if (!values.store_name) {
    errors.store_name = 'Wajib diisi';
  }
  if (!values.store_province) {
    errors.store_province = 'Wajib diisi';
  }
  if (!values.store_city) {
    errors.store_city = 'Wajib diisi';
  }
  if (!values.store_complete_address) {
    errors.store_complete_address = 'Wajib diisi';
  }
  if (!values.store_description) {
    errors.store_description = 'Wajib diisi';
  } else if (values.store_description.length < 20) {
    errors.store_description = 'Deskripsi toko minimal 20 karakter';
  }
  if (!values.store_postal_code) {
    errors.store_postal_code = 'Wajib diisi';
  } else if (values.store_postal_code.length !== 5) {
    errors.store_postal_code = 'Kode pos harus 5 digit';
  }

  return errors;
};

const CreateStore = ({ data }) => {
  const { createStore } = useContext(ProductContext);
  const [province, setProvince] = useState(data.data);
  const [provinceId, setProvinceId] = useState(null);
  const [city, setCity] = useState([]);
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');

  if (typeof window !== undefined) {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }

    function showPosition(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    }
    // getLocation()
  }
  useEffect(() => {
    if (provinceId !== null) {
      async function fetchData() {
        const { data } = await callRajaOngkirAPI({
          path: `/api/city/${provinceId}`,
          method: 'GET',
        });
        setCity(data.data);
        console.log(data);
      }
      fetchData();
    }
  }, [provinceId]);

  const formik = useFormik({
    initialValues: {
      store_name: '',
      store_province: '',
      store_city: '',
      store_complete_address: '',
      store_postal_code: '',
    },
    validate,
    onSubmit: (values) => {
      getLocation();
      const formData = new FormData();
      formData.append('store_name', values.store_name);
      formData.append('store_description', values.store_description);
      formData.append('store_image_profile', values.store_image_profile);
      formData.append('store_city', values.store_city);
      formData.append('store_id_city', values.store_city_id);
      formData.append('store_province', values.store_province);
      formData.append('store_id_province', values.store_province_id);
      formData.append('store_complete_address', values.store_complete_address);
      formData.append('store_postal_code', values.store_postal_code);
      formData.append('store_long', long);
      formData.append('store_lat', lat);
      toast
        .promise(createStore(formData), {
          loading: 'Membuat Toko ...',
          success: 'Berhasil membuat toko',
          error: 'Gagal membuat toko',
        })
        .then(() => {
          Cookies.remove('token');
          Cookies.remove('role');
          window.location.href = '/';
        });
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
          <label className='text-sm font-medium tracking-wide text-gray-700'>Foto Toko</label>

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

        <div className='relative mt-2'>
          <label className='text-sm font-medium tracking-wide text-gray-700'>Provinsi Asal</label>
          <select
            className='w-full px-4 py-4 text-base text-gray-700 bg-white border border-gray-200 shadow-md rounded-2xl focus:outline-none focus:border-green-400'
            name='store_province'
            id='store_province'
            onChange={(e) => {
              formik.setFieldValue('store_province', e.target.value.split(',')[1]);
              formik.setFieldValue('store_province_id', e.target.value.split(',')[0]);
              setProvinceId(e.target.value.split(',')[0]);
            }}>
            {province.map((item) => (
              <option key={item.province_id} value={`${item.province_id},${item.province}`}>
                {item.province}
              </option>
            ))}
          </select>
        </div>

        {provinceId !== null && (
          <div className='relative mt-2'>
            <label className='text-sm font-medium tracking-wide text-gray-700'>Kota Asal</label>
            <select
              className='w-full px-4 py-4 text-base text-gray-700 bg-white border border-gray-200 shadow-md rounded-2xl focus:outline-none focus:border-green-400'
              name='store_city'
              id='store_city'
              // onChange={formik.handleChange}
              // value={formik.values.store_city}
              onChange={(e) => {
                formik.setFieldValue('store_city', e.target.value.split(',')[1]);
                formik.setFieldValue('store_city_id', e.target.value.split(',')[0]);
              }}>
              {city.map((item) => (
                <option
                  key={item.city_id}
                  value={`${item.city_id},${item.city_name}`}
                  // onClick={() => {
                  //   formik.setFieldValue('store_city', item.city_name);
                  //   formik.setFieldValue('store_city_id', item.city_id);
                  //   console.log(item)
                  // }}
                >
                  {item.type} {item.city_name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Input
          id='store_postal_code'
          name='store_postal_code'
          type='text'
          label='Kode Pos'
          handleChange={formik.handleChange}
          value={formik.values.store_postal_code}
          placeholder='Masukkan kode pos'
          errors={formik.errors.store_postal_code}
        />
        <TextArea
          id='store_complete_address'
          name='store_complete_address'
          type='text'
          label='Alamat'
          handleChange={formik.handleChange}
          value={formik.values.store_complete_address}
          placeholder='Masukkan alamat lengkap'
          errors={formik.errors.store_complete_address}
        />

        <div className='flex items-center content-center justify-between mt-6'>
          <span></span>
          <AuthButton icon={<MdLogin />} isLoading>
            Daftar
          </AuthButton>
          {/* <button
            type='button'
            className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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

export default CreateStore;

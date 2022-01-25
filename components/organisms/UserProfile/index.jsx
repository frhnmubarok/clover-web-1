/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { HiOutlineKey } from 'react-icons/hi';
import { useFormik } from 'formik';

import { getUserProfile } from '@/services/user';
import FullscreenLoading from '@/components/atoms/FullscreenLoading';

const UserProfile = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [userData, setUserData] = useState({});

  const formik = useFormik({
    initialValues: {
      fullname: userData.fullname || '',
    },
    onSubmit: async (values) => {
      // const { data } = await addUserAddress(values);
      console.log(values);
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserProfile();
      console.log(data.data);
      return data.data;
    };
    getUser().then((data) => setUserData(data));
    // setStartDate(userData.born_date !== null ? new Date(userData.born_date) : new Date());
  }, []);

  useEffect(() => {
    if (userData !== {}) {
      formik.setFieldValue('fullname', userData.fullname);
    }
  }, [userData]);

  if (Object.keys(userData).length === 0) return <FullscreenLoading />;
  return (
    <>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>Settings</h3>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <div>
          <div className='p-4 rounded-lg shadow-sm border border-gray-300 mt-4'>
            <div className='flex justify-center items-center bg-neutral-focus text-neutral-content rounded-lg w-auto h-56'>
              <span className='text-4xl'>FM</span>
            </div>
            <div className='mt-4'>
              <label className='flex justify-center items-center cursor-pointer w-full py-2 text-sm text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                Upload Foto
                <input type='file' className='hidden' />
              </label>
            </div>
            <p className='text-xs text-gray-400 mt-4'>
              Besar file: maksimum 2 MB. Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
            </p>
          </div>
          <div className='mt-4'>
            <Link href={'/change-password'}>
              <a className='flex justify-center items-center w-full border border-gray-300 py-2 text-sm text-gray-700 duration-200 ease-in-out rounded-lg bg-white hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                <span className='mr-2'>
                  <HiOutlineKey />
                </span>
                Ubah Password
              </a>
            </Link>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='flex items-center justify-between mt-4'>
            <h3 className='text-md font-semibold leading-6 text-gray-500'>Ubah Biodata Diri</h3>
          </div>
          <div>
            <dl>
              <div className='mt-6 sm:grid sm:grid-cols-3 sm:gap-4 flex justify-center items-center'>
                <dt className='text-sm font-medium text-gray-500'>Nama Lengkap</dt>
                <dd className='mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2'>
                  <input
                    type='text'
                    name='fullname'
                    id='fullname'
                    autoComplete='given-name'
                    // value={userData.fullname}
                    handleChange={formik.handleChange}
                    value={formik.values.fullname}
                    errors={formik.errors.fullname}
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </dd>
              </div>
              <div className='mt-4 sm:grid sm:grid-cols-3 sm:gap-4 flex justify-center items-center'>
                <dt className='text-sm font-medium text-gray-500'>Tanggal Lahir</dt>
                <dd className='mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2'>
                  {/* 18/03/1997{' '}
                          <span>
                            <button href='#' className='ml-2 text-primary-500 text-xs'>
                              Ubah
                            </button>
                          </span> */}
                  <DatePicker
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode='select'
                  />
                </dd>
              </div>
              <div className='mt-4 sm:grid sm:grid-cols-3 sm:gap-4 flex justify-center items-center'>
                <dt className='text-sm font-medium text-gray-500'>Jenis Kelamin</dt>
                <dd className='mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2'>
                  {/* Pria{' '}
                          <span>
                            <button href='#' className='ml-2 text-primary-500 text-xs'>
                              Ubah
                            </button>
                          </span> */}
                  <select
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    name='gender'
                    id='gender'
                    onChange={formik.handleChange}
                    value={formik.values.gender}>
                    <option value={'laki laki'}>Laki-laki</option>
                    <option value={'perempuan'}>Perempuan</option>
                  </select>
                </dd>
              </div>
            </dl>
          </div>
          <div className='flex items-center justify-between mt-8'>
            <h3 className='text-md font-semibold leading-6 text-gray-500'>Ubah Kontak</h3>
          </div>
          <div>
            <dl>
              <div className='mt-6 sm:grid sm:grid-cols-3 sm:gap-4 flex justify-center items-center'>
                <dt className='text-sm font-medium text-gray-500'>Email</dt>
                <dd className='mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2'>
                  {/* farhanmubarok104@gmail.com{' '}
                          <span>
                            <button href='#' className='ml-2 text-primary-500 text-xs'>
                              Ubah
                            </button>
                          </span> */}
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    autoComplete='given-name'
                    value='farhanmubarok104@gmail.com'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </dd>
              </div>
              <div className='mt-4 sm:grid sm:grid-cols-3 sm:gap-4 flex justify-center items-center'>
                <dt className='text-sm font-medium text-gray-500'>Handphone</dt>
                <dd className='mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2'>
                  {/* 085155155695{' '}
                          <span>
                            <button href='#' className='ml-2 text-primary-500 text-xs'>
                              Ubah
                            </button>
                          </span> */}
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    autoComplete='given-name'
                    value='085155155695'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <button className='block mt-4 w-32 py-2 text-sm font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
          Simpan
        </button>
      </div>
    </>
  );
};

export default UserProfile;

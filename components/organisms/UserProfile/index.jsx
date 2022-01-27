/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { HiOutlineKey } from 'react-icons/hi';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { setUserProfilePhoto, setUserProfileName } from '@/features/user/userSlice';
import { getUserProfile, updateUserProfile } from '@/services/user';
import FullscreenLoading from '@/components/atoms/FullscreenLoading';
import toast from 'react-hot-toast';
import Image from 'next/image';

const validate = (values) => {
  const errors = {};

  if (!values.gender) {
    errors.gender = 'Wajib diisi';
  }

  return errors;
};

const UserProfile = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.user_name);

  const formik = useFormik({
    initialValues: {
      fullname: userData.fullname,
      email: userData.email,
      handphone: userData.handphone,
      gender: userData.gender || 'laki laki',
    },
    onSubmit: async (values) => {
      // const { data } = await addUserAddress(values);
      const formData = new FormData();
      formData.append('fullname', values.fullname);
      formData.append('gender', values.gender === null ? 'laki laki' : values.gender);
      formData.append('born_date', startDate.toISOString().split('T')[0]);
      if (values.photo !== undefined) {
        formData.append('photo', values.photo);
      }
      const submit = async () => {
        const response = await updateUserProfile(formData);
        if (response.status >= 400) {
          throw new Error(response.statusText);
        } else {
          console.log(response);
          return response;
        }
      };
      toast
        .promise(submit(), {
          loading: 'Mohon tunggu...',
          success: 'Update profil berhasil !',
          error: 'Update profil gagal !',
        })
        .then(async () => {
          const profile = await getUserProfile();
          setUserData(profile.data.data);
          dispatch(setUserProfilePhoto(profile.data.data.photo));
          dispatch(setUserProfileName(profile.data.data.fullname));
        });

      const data = { ...values, born_date: startDate };
      console.log(data);
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserProfile();
      console.log(data.data);
      return data.data;
    };
    getUser().then((data) => {
      console.log(data);
      setStartDate(data.born_date !== null ? new Date(data.born_date) : new Date());
      if (data.photo !== null) {
        dispatch(setUserProfilePhoto(data.photo));
      }
      setUserData(data);
      // dispatch(setUserProfilePhoto(data.photo));
      dispatch(setUserProfileName(data.fullname));
    });
  }, []);
  // dispatch(setUserPhoto('https://i.pinimg.com/originals/d1/c1/a0/d1c1a0f49391979e6d74eeaef267161b.jpg'));

  useEffect(() => {
    if (userData !== {}) {
      formik.setFieldValue('fullname', userData.fullname);
      formik.setFieldValue('email', userData.email);
      formik.setFieldValue('handphone', userData.handphone);
      formik.setFieldValue('gender', userData.gender);
    }
  }, [userData]);

  const defaultPhoto = () => {
    const initalName = [];
    const name = userName;
    const split = name.split(' ');
    split.map((item) => initalName.push(item.charAt(0)));
    return initalName.join('');
  };

  console.log(defaultPhoto());

  if (Object.keys(userData).length === 0) return <FullscreenLoading />;

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>Settings</h3>
        </div>
        <div className='grid grid-cols-3 gap-6'>
          <div>
            <div className='p-4 rounded-lg shadow-sm border border-gray-300 mt-4'>
              {/* <div className='flex justify-center items-center bg-neutral-focus text-neutral-content rounded-lg w-auto h-56'>
                <span className='text-4xl'>FM</span>
              </div> */}
              {userData.photo !== null ? (
                <div className='flex justify-center items-center rounded-lg w-auto h-56'>
                  <Image
                    src={userData.photo}
                    alt={'user profile'}
                    width={210}
                    height={210}
                    priority={true}
                    unoptimized={true} // for handle access for bidden
                    className='object-cover object-center rounded-lg'
                  />
                </div>
              ) : (
                <div className='flex justify-center items-center bg-neutral-focus text-neutral-content rounded-lg w-auto h-56'>
                  <span className='text-4xl'>{defaultPhoto()}</span>
                </div>
              )}

              <div className='mt-4'>
                <label className='flex justify-center items-center cursor-pointer w-full py-2 text-sm text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                  Upload Foto
                  <input
                    type='file'
                    className='hidden'
                    id='product_image'
                    name='product_image'
                    onChange={(event) => {
                      formik.setFieldValue('photo', event.currentTarget.files[0]);
                    }}
                  />
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
                      onChange={formik.handleChange}
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
                      defaultValue={'laki laki'}
                      value={formik.values.gender || 'laki laki'}>
                      <option defaultValue={'laki laki'} value={'laki laki'}>
                        Laki-laki
                      </option>
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
                    {userData.email}{' '}
                    <span>
                      <button href='#' className='ml-2 text-primary-500 text-xs'>
                        Ubah
                      </button>
                    </span>
                    {/* <input
                      type='text'
                      name='email'
                      id='email'
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      errors={formik.errors.email}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    /> */}
                  </dd>
                </div>
                <div className='mt-4 sm:grid sm:grid-cols-3 sm:gap-4 flex justify-center items-center'>
                  <dt className='text-sm font-medium text-gray-500'>Handphone</dt>
                  <dd className='mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2'>
                    {userData.handphone !== null ? userData.handphone : 'Belum terdaftar'}{' '}
                    <span>
                      <button href='#' className='ml-2 text-primary-500 text-xs'>
                        Ubah
                      </button>
                    </span>
                    {/* <input
                      type='text'
                      name='handphone'
                      id='handphone'
                      onChange={formik.handleChange}
                      value={formik.values.handphone}
                      errors={formik.errors.handphone}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    /> */}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='block mt-4 w-32 py-2 text-sm font-semibold text-white duration-200 ease-in-out rounded-lg bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
            Simpan
          </button>
        </div>
      </form>
    </>
  );
};

export default UserProfile;

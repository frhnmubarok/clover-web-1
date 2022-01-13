import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import { MdLogin } from 'react-icons/md';
import toast from 'react-hot-toast';

import { AuthContext } from 'context/AuthContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';
import useLoadingToast from '@/hooks/useLoadingToast';

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Wajib diisi';
  } else if (!values.account) {
    errors.account = 'Wajib diisi';
  }

  return errors;
};

const Login = () => {
  const { userLogin, loginStatus } = useContext(AuthContext);
  const isLoading = useLoadingToast();

  const formik = useFormik({
    initialValues: {
      account: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      let temp = { password: values.password };
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.account)) {
        temp = { ...temp, email: values.account };
      } else if (isNaN(values.account)) {
        temp = { ...temp, username: values.account };
      } else {
        temp = { ...temp, handphone: values.account };
      }
      toast.promise(userLogin(temp), {
        loading: 'Mohon tunggu...',
        success: 'Login berhasil !',
        error: 'Login gagal !',
      });
      console.log('halo');
    },
  });
  return (
    <AuthLayout formImage login={true} formLabel='Masuk'>
      <div className='flex flex-col items-center mb-2'>
        <p>
          Belum punya akun ?{' '}
          <Link href='/register'>
            <a className='text-blue-400'>Daftar</a>
          </Link>
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id='account'
          name='account'
          type='text'
          label='Username/Email/No. Handphone'
          handleChange={formik.handleChange}
          value={formik.values.account}
          placeholder='Username/Email/No. Handphone'
          errors={formik.errors.account}
        />
        <Input
          id='password'
          name='password'
          type='password'
          label='Password'
          handleChange={formik.handleChange}
          value={formik.values.password}
          placeholder='Masukkan password'
          errors={formik.errors.password}
        />
        <div className='flex items-center justify-between'>
          <div className='py-4'>
            <label className='inline-flex items-center'>
              <input
                className='w-6 h-6 mr-2 text-indigo-500 border border-gray-300 rounded focus:ring-indigo-400 focus:ring-opacity-25'
                type='checkbox'
              />
              Ingat saya
            </label>
          </div>
          <p className='py-4'>
            <Link href='/forgot-password'>
              <a className='text-blue-400'>Lupa Password ?</a>
            </Link>
          </p>
        </div>
        <div className='items-center'>
          <AuthButton icon={<MdLogin />}>Masuk</AuthButton>
          {/* <p className="pt-4 ">
            Belum punya akun ?{" "}
            <Link href="/register">
              <a className="text-green-400">Daftar</a>
            </Link>
          </p> */}
          <p>
            <Link href='https://dev-api-clover.herokuapp.com/auth'>
              <a className='text-blue-400'>Google Sign</a>
            </Link>
          </p>
          <AuthButton icon={<MdLogin />} isLoading={isLoading}>
            Masuk
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
};

Login.layoutProps = {
  meta: {
    title: 'Login',
  },
};

export default Login;

/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import { MdLogin } from 'react-icons/md';

import { AuthContext } from 'context/AuthContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';
import useLoadingToast from '@/hooks/useLoadingToast';
import toast from 'react-hot-toast';

const validate = (values) => {
  const errors = {};

  if (!values.account) {
    errors.account = 'Wajib diisi';
  }

  if (!values.username) {
    errors.username = 'Wajib diisi';
  } else if (values.username.length < 8) {
    errors.username = 'Username minimal 8 karakter';
  }

  if (!values.fullname) {
    errors.fullname = 'Wajib diisi';
  }

  if (!values.password) {
    errors.password = 'Wajib diisi';
  } else if (values.password.length < 8) {
    errors.password = 'Password minimal 8 karakter';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Wajib diisi';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password harus sama';
  }

  return errors;
};

const Register = () => {
  const { userRegister } = useContext(AuthContext);
  const isLoading = useLoadingToast();

  const formik = useFormik({
    initialValues: {
      account: '',
      username: '',
      fullname: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (values) => {
      let temp = { password: values.password, username: values.username, fullname: values.fullname };
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.account)) {
        temp = { ...temp, email: values.account };
      } else {
        temp = { ...temp, handphone: values.account };
      }
      toast.promise(userRegister(temp), {
        loading: 'Mohon tunggu...',
        success: 'Pendaftaran akun berhasil !',
        error: 'Register gagal !',
      });
      console.log(temp);
    },
  });

  return (
    <AuthLayout formImage formLabel='Daftar dan buat akun mu'>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id='account'
          name='account'
          type='text'
          label='Email'
          handleChange={formik.handleChange}
          value={formik.values.account}
          placeholder='Masukkan Email kamu'
          errors={formik.errors.account}
        />

        <Input
          id='fullname'
          name='fullname'
          type='text'
          label='Nama Lengkap'
          handleChange={formik.handleChange}
          value={formik.values.fullname}
          placeholder='Masukkan nama lengkap kamu'
          errors={formik.errors.fullname}
        />

        <Input
          id='username'
          name='username'
          type='text'
          label='Username'
          handleChange={formik.handleChange}
          value={formik.values.username}
          placeholder='Masukkan username kamu'
          errors={formik.errors.username}
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

        <Input
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Konfirmasi Password'
          handleChange={formik.handleChange}
          value={formik.values.confirmPassword}
          placeholder='Masukkan password'
          errors={formik.errors.confirmPassword}
        />
        <div className='flex flex-col items-center content-center justify-between mt-6'>
          <AuthButton icon={<MdLogin />} isLoading>
            Daftar
          </AuthButton>
          <p className='pt-4 '>
            Sudah punya akun ?{' '}
            <Link href='/login'>
              <a className='text-blue-400'>Masuk</a>
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

Register.layoutProps = {
  meta: {
    title: 'Register',
  },
};

export default Register;

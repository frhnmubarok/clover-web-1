import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { MdSend } from 'react-icons/md';

import { AuthContext } from 'context/AuthContext';
import toast from 'react-hot-toast';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Wajib diisi';
  }

  if (!values.new_password) {
    errors.new_password = 'Wajib diisi';
  } else if (values.new_password.length < 8) {
    errors.new_password = 'Password minimal 8 karakter';
  }

  if (!values.confirm_new_password) {
    errors.confirm_new_password = 'Wajib diisi';
  } else if (values.confirm_new_password !== values.new_password) {
    errors.confirm_new_password = 'Password baru harus sama';
  }

  return errors;
};

const ChangePassword = () => {
  const { userChangePassword } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('token') === undefined) {
      router.push('/');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      confirm_new_password: '',
    },
    validate,
    onSubmit: (values) => {
      if (values.password === values.new_password) {
        toast.error('Password baru tidak boleh sama dengan password lama');
      }
      userChangePassword({
        password: values.password,
        new_password: values.new_password,
      });
    },
  });
  return (
    <AuthLayout formLabel={'Ganti Password'} login={true}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id='password'
          name='password'
          type='password'
          label='Password Lama'
          handleChange={formik.handleChange}
          value={formik.values.password}
          placeholder='Masukkan password lama'
          errors={formik.errors.password}
        />
        <Input
          id='new_password'
          name='new_password'
          type='password'
          label='Password Baru'
          handleChange={formik.handleChange}
          value={formik.values.new_password}
          placeholder='Masukkan password baru'
          errors={formik.errors.new_password}
        />
        <Input
          id='confirm_new_password'
          name='confirm_new_password'
          type='password'
          label='Konfirmasi Password Baru'
          handleChange={formik.handleChange}
          value={formik.values.confirm_new_password}
          placeholder='Masukkan password baru'
          errors={formik.errors.confirm_new_password}
        />
        <div className='items-center mt-6'>
          <AuthButton icon={<MdSend />}>Kirim</AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ChangePassword;

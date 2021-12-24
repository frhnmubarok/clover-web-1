import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { MdSend } from 'react-icons/md';

import { AuthContext } from 'context/AuthContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Wajib diisi';
  } else if (values.password.length < 8) {
    errors.password = 'Password minimal 8 karakter';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Wajib diisi';
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = 'Password minimal 8 karakter';
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password harus sama';
  }

  return errors;
};

const Reset = () => {
  const { userConfirmPassword } = useContext(AuthContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (values) => {
      userConfirmPassword({ password: values.password });
      console.log(values);
    },
  });
  return (
    <AuthLayout formImage formLabel='Reset Password'>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id='password'
          name='password'
          type='password'
          label='Password Baru'
          handleChange={formik.handleChange}
          value={formik.values.password}
          placeholder='Masukkan password baru kamu'
          errors={formik.errors.password}
        />
        <Input
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Konfirmasi Password Baru'
          handleChange={formik.handleChange}
          value={formik.values.confirmPassword}
          placeholder='Masukkan lagi password baru kamu'
          errors={formik.errors.confirmPassword}
        />
        <div className='items-center mt-4'>
          <AuthButton icon={<MdSend />}>Kirim</AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Reset;

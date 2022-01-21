import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { MdSend } from 'react-icons/md';
import OtpInput from 'react-otp-input';

import { AuthContext } from 'context/AuthContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';
import toast from 'react-hot-toast';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Wajib diisi';
  } else if (!values.email) {
    errors.email = 'Wajib diisi';
  }

  return errors;
};

const ConfirmOTP = () => {
  const { userVerifOTP } = useContext(AuthContext);
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleChange = (value) => {
    setOtp(value);
    console.log(otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(userVerifOTP({ otp: otp }), {
      loading: 'Mohon tunggu...',
      success: 'OTP Cocok !',
      error: 'OTP tidak cocok !',
    });
  };
  return (
    <AuthLayout formImage formLabel='Konfirmasi OTP'>
      <form onSubmit={handleSubmit}>
        <OtpInput
          containerStyle={'flex flex-row justify-center text-center px-2 mt-5 w-full'}
          value={otp}
          onChange={handleChange}
          numInputs={6}
          inputStyle={'m-1 border h-12 w-32-imp text-center rounded-xl bg-cool-gray-200 border-gray-200 font-semibold'}
          separator={<span>-</span>}
          shouldAutoFocus={true}
          isInputNum={true}
        />
        <div className='items-center mt-4 pl-4'>
          <AuthButton icon={<MdSend />}>Kirim</AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
};

const ForgotPassword = () => {
  const { userForgotPassword } = useContext(AuthContext);
  const router = useRouter();
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (values) => {
      toast
        .promise(userForgotPassword(values), {
          loading: 'Mohon tunggu...',
          success: 'OTP berhasil dikirim ke email anda !',
          error: 'Login gagal !',
        })
        .then(() => {
          setEmailSubmitted(true);
        });
      console.log(values);
    },
  });
  return (
    <>
      {emailSubmitted ? (
        <ConfirmOTP />
      ) : (
        <AuthLayout formImage formLabel='Lupa password akun kamu ?'>
          <form onSubmit={formik.handleSubmit}>
            <Input
              id='email'
              name='email'
              type='email'
              label='Email'
              handleChange={formik.handleChange}
              value={formik.values.email}
              placeholder='Masukkan email kamu'
              errors={formik.errors.email}
            />
            <div className='items-center mt-4'>
              <AuthButton icon={<MdSend />}>Kirim</AuthButton>
            </div>
          </form>
        </AuthLayout>
      )}
    </>
  );
};

export default ForgotPassword;

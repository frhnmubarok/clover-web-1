import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useFormik } from 'formik';
import { MdLogin } from 'react-icons/md';
import toast from 'react-hot-toast';

import { AuthContext } from 'context/AuthContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';
import useLoadingToast from '@/hooks/useLoadingToast';
import Link from '@/components/atoms/Link';

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
          {/* <p className="pt-4 ">
            Belum punya akun ?{" "}
            <Link href="/register">
              <a className="text-green-400">Daftar</a>
            </Link>
          </p> */}
          <AuthButton icon={<MdLogin />} isLoading={isLoading}>
            Masuk
          </AuthButton>

          <div className='pt-3'>
            <Link
              href='https://dev-api-clover.herokuapp.com/auth'
              className='relative inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-gray-700 duration-150 ease-in-out bg-white border border-gray-200 rounded-lg group hover:bg-gray-200 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <FcGoogle className='w-5 h-5' />
              </span>
              Sign in with Google
            </Link>
          </div>
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

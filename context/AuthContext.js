import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  authRegister,
  authLogin,
  authChangePassword,
  authForgotPassword,
  authVerifOTP,
  authConfirmPassword,
  authLogout,
  authGetRoles,
} from 'services/auth';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('token') !== undefined) {
      setLoginStatus(true);
    }
  }, []);

  const userRegister = async (formData) => {
    // await axios.get(`https://dev-api-clover.herokuapp.com/sanctum/csrf-cookie`);
    const response = await authRegister(formData);
    if (response.error) {
      const errData = response.message;
      console.log(response);
      'handphone' in errData && toast.error('No. Handphone sudah digunakan');
      'email' in errData && toast.error('Email sudah digunakan');
      'username' in errData && toast.error('Username sudah digunakan');
    } else {
      toast.success(`Pendaftaran akun berhasil`);
      router.push('/register/success');
      setIsLoading(false);
    }
  };

  const userLogin = async (formData) => {
    // await axios.get(`https://dev-api-clover.herokuapp.com/sanctum/csrf-cookie`);
    const response = await authLogin(formData);
    if (response.error) {
      console.log(response.error);
      toast.error('Akun atau password anda salah');
    } else {
      const { id, username, email, role } = response.data.data;
      console.log(response.data);
      Cookies.set('token', response.data.token, { expires: 30 });
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role.role);
      Cookies.set('role', role.role);
      setLoginStatus(true);
      toast.success('Login berhasil');
      router.push('/');
    }
  };

  const userChangePassword = async (formData) => {
    const response = await authChangePassword(formData);
    if (response.error) {
      console.log(response);
      toast.error('Password gagal diubah');
    } else {
      toast.success(response.data.message);
      router.push('/');
    }
  };

  const userForgotPassword = async (formData) => {
    const response = await authForgotPassword(formData);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success(response.data.message);
      localStorage.setItem('userId', response.data.user.id);
    }
  };

  const userVerifOTP = async (formData) => {
    const response = await authVerifOTP(formData);
    if (response.error) {
      console.log(response);
      toast.error(response.message);
    } else {
      toast.success(response.data.message);
      console.log(response.data);
      router.push('/forgot-password/reset');
    }
    // authVerifOTP(formData)
    //   .then((res) => {
    //     console.log(res);
    //     toast.success(res.message);
    //     router.push('/forgot-password/reset');
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //     toast.error(err.response.data.message);
    //   });
  };

  const userConfirmPassword = async (formData) => {
    const response = await authConfirmPassword(formData);
    if (response.error) {
      console.log(response);
      toast.error(response.message);
    } else {
      console.log(response.data);
      toast.success(`${response.data.message}, anda akan segera dialihkan ke halaman login`);
      localStorage.removeItem('userId');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
    // authConfirmPassword(formData)
    //   .then((res) => {
    //     console.log(res);
    //     toast.success(`${res.message}, anda akan segera dialihkan ke halaman login`);
    //     localStorage.removeItem('userId');
    //     setTimeout(() => {
    //       router.push('/login');
    //     }, 2000);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //     toast.error(err.response.data.message);
    //   });
  };

  const userLogout = (formData) => {
    authLogout(formData)
      .then((res) => {
        console.log(res.data);
        Cookies.remove('id');
        Cookies.remove('email');
        Cookies.remove('handphone');
        Cookies.remove('user');
        Cookies.remove('token');
        setLoginStatus(false);
        toast.success(`Berhasil Logout`);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Gagal Logout');
      });
  };

  return (
    <AuthContext.Provider
      value={{
        userRegister,
        userLogin,
        userChangePassword,
        userForgotPassword,
        userVerifOTP,
        userConfirmPassword,
        userLogout,
        setLoginStatus,
        loginStatus,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

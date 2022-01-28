import React, { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addKYC, addReview } from '@/services/kyc';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import FormData from 'form-data';

export const KYCContext = createContext();

export const KYCProvider = (props) => {
  const [dataDiri, setDataDiri] = useState(null);
  const router = useRouter();
  const form = new FormData();
  // useEffect(() => {
  //   if (Cookies.get("token") !== undefined) {
  //     setLoginStatus(true);
  //   }
  // }, []);

  const registerKYC = async (formData) => {
    const response = await addKYC(formData);
    console.log(response);
    if (response.status === 400) {
      const errData = response.data.message;
      // 'kyc_ktp' in errData &&
      //   toast.error('Nomor KTP Sudah terdaftar, Harap menggunakan Nomor KTP yang belum terdaftar');
      toast.error(
        (errData?.kyc_ktp && 'Nomor KTP Sudah terdaftar, Harap menggunakan Nomor KTP yang belum terdaftar') || errData,
      );
      throw new Error(errData);
    } else {
      return response;
    }
    // if (response.error) {
    //   console.log(response);
    //   toast.error(response.message);
    //   throw new Error(response.message);
    // } else {
    //   console.log(response.data);
    // }
  };

  const reviewKYC = async (formData) => {
    const response = await addReview(formData);
    if (response.error) {
      console.log(response);
      toast.error(response.message);
    } else {
      toast.success(response.data.message);
      console.log(response.data);
      // router.push('/forgot-password/reset');
    }
  };

  return (
    <KYCContext.Provider
      value={{
        registerKYC,
        reviewKYC,
        dataDiri,
        setDataDiri,
        form,
      }}>
      {props.children}
    </KYCContext.Provider>
  );
};

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
    if (response.error) {
      console.log(response);
      toast.error(response.message);
    } else {
      toast.success(response.data.message);
      console.log(response.data);
      // router.push('/forgot-password/reset');
    }
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

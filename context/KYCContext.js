import React, { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addKYC } from '@/services/kyc';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

export const KYCContext = createContext();

export const KYCProvider = (props) => {
  const router = useRouter();
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
  
 

  

  return (
    <KYCContext.Provider
      value={{
        registerKYC,
      }}>
      {props.children}
    </KYCContext.Provider>
  );
};

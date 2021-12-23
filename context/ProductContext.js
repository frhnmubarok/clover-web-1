import React, { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { insertProductAPI, insertProductImageAPI, createStoreAPI } from 'services/product';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const router = useRouter();
  // useEffect(() => {
  //   if (Cookies.get("token") !== undefined) {
  //     setLoginStatus(true);
  //   }
  // }, []);

  const addProduct = async (formData) => {
    const response = await insertProductAPI(formData);
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      toast.success(response.message);
      console.log(response.data.data.id);
      localStorage.setItem('product_id', response.data.data.id);
    }
    // insertProductAPI(formData)
    //   .then((res) => {
    //     console.log(res.data.data.id);
    //     localStorage.setItem('product_id', res.data.data.id);
    //     if (res.status === 200) {
    //       toast.success(`Produk berhasil ditambahkan`);
    //     } else {
    //       toast.error(`Produk gagal ditambahkan`);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(`Produk gagal ditambahkan`);
    //   });
  };

  const addProductImage = async (formData, id) => {
    const response = await insertProductImageAPI(formData, id);
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      toast.success(response.message);
      console.log(response.data);
      localStorage.removeItem('product_id');
    }
    // insertProductImageAPI(formData, id)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.status === 200) {
    //       toast.success(`Produk berhasil ditambahkan`);
    //     } else {
    //       toast.error(`Produk gagal ditambahkan`);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(`Produk gagal ditambahkan`);
    //   });
  };

  const createStore = async (formData) => {
    const response = await createStoreAPI(formData);
    if (response.error) {
      const errData = response.message;
      'store_name' in errData && toast.error('Error Store Name');
      'store_description' in errData && toast.error('Deskripsi toko harus terdiri dari minimal 20 karakter');
      'store_image_profile' in errData && toast.error('Error Store Image Profile');
    } else {
      toast.success(response.data.message);
      console.log(response.data);
      // router.push('/forgot-password/reset');
    }
  };

  return (
    <ProductContext.Provider
      value={{
        addProduct,
        addProductImage,
        createStore,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

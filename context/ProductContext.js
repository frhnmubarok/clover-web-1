import React, { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  insertProductAPI,
  insertProductImageAPI,
  createStoreAPI,
  deleteProductAPI,
  getProductAPI,
  getProductByIdAPI,
  updateProductAPI,
  updateTransactionStatusAPI,
  getTransactionDetailAPI,
  getAllTransactionAPI,
} from 'services/product';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { deleteTransactionAPI } from '@/services/transaction';

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
      // toast.error(response.message);
    } else {
      console.log(response.data.data.id);
      localStorage.setItem('product_id', response.data.data.id);
      router.push('/dashboard/all-products');
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

  const updateProduct = async (formData, id) => {
    console.log(formData);
    console.log(id);
    const response = await updateProductAPI(formData, id);
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      // toast.success(response.message);
      console.log(response.data.data.id);
      localStorage.setItem('product_id', response.data.data.id);
    }
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
  };

  const deleteProduct = async (id) => {
    const response = await deleteProductAPI(id);
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      toast.success('Produk berhasil dihapus');
      console.log(response.data);
    }
  };

  const getProduct = async () => {
    const response = await getProductAPI();
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      // toast.success(response.message);
      // console.log(response.data);
      return response.data;
    }
  };

  const getProductById = async (id) => {
    const response = await getProductByIdAPI(id);
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      // toast.success(response.message);
      // console.log(response.data);
      return response.data;
    }
  };

  const createStore = async (formData) => {
    const response = await createStoreAPI(formData);
    console.log(response);
    if (response.status >= 400) {
      const errData = response.message;
      toast.error(response.data.message);
      // 'store_name' in errData && toast.error('Error Store Name');
      // 'store_description' in errData && toast.error('Deskripsi toko harus terdiri dari minimal 20 karakter');
      // 'store_image_profile' in errData && toast.error('Error Store Image Profile');
    } else {
      // toast.success(response.data.message);
      console.log(response.data);
    }
  };

  const updateTransactionStatus = async (id, data) => {
    console.log(id);
    console.log(data);
    const response = await updateTransactionStatusAPI(id, data);
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      toast.success('Status transaksi berhasil diubah');
      console.log(response.data);
      return {
        error: false,
        data: response.data.data,
      };
    }
  };

  const getTransactionDetail = async (id) => {
    const response = await getTransactionDetailAPI(id);
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      // toast.success(response.message);
      // console.log(response.data);
      return response.data;
    }
  };

  const getAllTransaction = async (id) => {
    const response = await getAllTransactionAPI();
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      // toast.success(response.message);
      // console.log(response.data);
      return response.data;
    }
  };

  const deleteTransaction = async (id) => {
    const response = await deleteTransactionAPI(id);
    if (response.error) {
      // const errData = response.message;
      console.log(response);
      toast.error(response.message);
    } else {
      toast.success('Transaksi berhasil dihapus');
      console.log(response.data);
      return {
        error: false,
        data: response.data.data,
      };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        addProduct,
        addProductImage,
        deleteProduct,
        updateProduct,
        getProduct,
        getProductById,
        createStore,
        updateTransactionStatus,
        getTransactionDetail,
        getAllTransaction,
        deleteTransaction,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

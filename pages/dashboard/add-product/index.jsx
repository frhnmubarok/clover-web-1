import React, { Fragment, useEffect, useContext, useState } from 'react';
import Cookies from 'js-cookie';

import AddProducts from '@/components/organisms/AddProducts';
import DashboardLayout from '@/components/templates/DashboardLayout';

import { AuthContext } from 'context/AuthContext';
import { ProductContext } from '@/context/ProductContext';
import toast from 'react-hot-toast';

const AddProductPage = () => {
  const { addProduct } = useContext(ProductContext);
  const { userLogout, setLoginStatus } = useContext(AuthContext);

  const handleLogout = () => {
    toast.promise(userLogout(), {
      loading: 'Mohon tunggu...',
      success: 'Berhasil Logout !',
      error: <b>Mohon maaf, telah terjadi kesalahan. Mohon coba lagi.</b>,
    });
    setLoginStatus(false);
  };

  return (
    <DashboardLayout handleLogout={handleLogout}>
      <AddProducts addProduct={addProduct} />
    </DashboardLayout>
  );
};

export default AddProductPage;

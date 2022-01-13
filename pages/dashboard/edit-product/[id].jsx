import React, { Fragment, useEffect, useContext, useState } from 'react';
import Cookies from 'js-cookie';

import AddProducts from '@/components/organisms/AddProducts';
import DashboardLayout from '@/components/templates/DashboardLayout';
import EditProduct from '@/components/organisms/EditProduct';

import { AuthContext } from 'context/AuthContext';
import { ProductContext } from '@/context/ProductContext';

const EditProductPage = () => {
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
      {/* <AddProducts addProduct={addProduct} /> */}
      <EditProduct addProduct={addProduct} />
    </DashboardLayout>
  );
};

export default EditProductPage;

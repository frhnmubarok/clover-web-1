import React, { Fragment, useEffect, useContext, useState } from 'react';
import Cookies from 'js-cookie';

import AddProducts from '@/components/organisms/AddProducts';
import DashboardLayout from '@/components/templates/DashboardLayout';

import { AuthContext } from 'context/AuthContext';
import { ProductContext } from '@/context/ProductContext';

const AddProductPage = () => {
  const { addProduct } = useContext(ProductContext);
  const { userLogout } = useContext(AuthContext);

  const handleLogout = () => {
    userLogout({ id: Cookies.get('id') });
  };
  return (
    <DashboardLayout handleLogout={handleLogout}>
      <AddProducts addProduct={addProduct} />
    </DashboardLayout>
  );
};

export default AddProductPage;

import React, { Fragment, useEffect, useContext, useState } from 'react';
import Cookies from 'js-cookie';

import AddProducts from '@/components/organisms/AddProducts';
import DashboardLayout from '@/components/templates/DashboardLayout';

import { AuthContext } from 'context/AuthContext';
import { ProductContext } from '@/context/ProductContext';
import AllProducts from '@/components/organisms/AllProducts';
import callAPI from '@/config/api';

const AllProductPage = ({ data }) => {
  const { addProduct } = useContext(ProductContext);
  const { userLogout } = useContext(AuthContext);

  const handleLogout = () => {
    userLogout({ id: Cookies.get('id') });
  };
  return (
    <DashboardLayout handleLogout={handleLogout}>
      <AllProducts data={data} />
    </DashboardLayout>
  );
};

export const getServerSideProps = async () => {
  const { data } = await callAPI({
    path: '/api/products',
    method: 'GET',
  });

  return {
    props: {
      data,
    },
  };
};

export default AllProductPage;

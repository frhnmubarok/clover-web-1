import React, { Fragment, useEffect, useContext, useState } from 'react';
import Cookies from 'js-cookie';

import AddProducts from '@/components/organisms/AddProducts';
import AllTransactions from '@/components/organisms/AllTransactions';
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
      {/* <AllProducts data={data} /> */}
      <AllTransactions data={data} />
    </DashboardLayout>
  );
};

export const getServerSideProps = async (context) => {
  // const token = Cookies.get('token');
  const req = context.req;
  const token = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('token='))
    .split('=')[1];
  const { data } = await callAPI({
    path: '/api/transaction',
    method: 'GET',
    token,
  });

  // console.log('token', token);

  return {
    props: {
      data,
    },
  };
};

export default AllProductPage;

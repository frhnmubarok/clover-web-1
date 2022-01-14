import React, { Fragment, useEffect, useContext, useState } from 'react';
import Cookies from 'js-cookie';

import AddProducts from '@/components/organisms/AddProducts';
import AllTransactions from '@/components/organisms/AllTransactions';
import DashboardLayout from '@/components/templates/DashboardLayout';

import { AuthContext } from 'context/AuthContext';
import { ProductContext } from '@/context/ProductContext';
import AllProducts from '@/components/organisms/AllProducts';
import callAPI from '@/config/api';
import toast from 'react-hot-toast';

const token = Cookies.get('token');

const AllProductPage = ({ data }) => {
  const [buff, setBuff] = useState('');
  const { addProduct } = useContext(ProductContext);
  const [products, setProducts] = useState(data);
  const { userLogout, setLoginStatus } = useContext(AuthContext);

  const handleLogout = () => {
    toast.promise(userLogout(), {
      loading: 'Mohon tunggu...',
      success: 'Berhasil Logout !',
      error: <b>Mohon maaf, telah terjadi kesalahan. Mohon coba lagi.</b>,
    });
    setLoginStatus(false);
  };

  const handleSocket = async() => {
    const res = await callAPI('/api/products', 'GET', null, token);
    setProducts(res.data);
  }

  useEffect(() => {
    const socket = async () => {
      const { data } = await callAPI({
        path: '/api/transaction',
        method: 'GET',
        token,
      });
      alert(buff);
      // console.log(data)
      setBuff('');
      console.log(data);
      setProducts(data);
    };
    if (buff !== '') socket();
  }, [buff]);

  if (typeof window !== 'undefined') {
    Echo.channel('Clover-channel').listen('.dashboard', (e) => {
      // console.log('ok')
      // alert(e.event)
      // console.log(e.store)
      // if(!buff){

      setBuff(e.event);
      // }
      // window.location.href = window.location.href
    });
    // console.log('tes')
  }
  return (
    <DashboardLayout handleLogout={handleLogout}>
      {/* <AllProducts data={data} /> */}
      <AllTransactions data={products} />
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

  console.log(data);

  // console.log('token', token);

  return {
    props: {
      data,
    },
  };
};

export default AllProductPage;

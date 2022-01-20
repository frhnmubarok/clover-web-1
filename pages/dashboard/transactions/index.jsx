import React, { Fragment, useEffect, useContext, useState } from 'react';
import Cookies from 'js-cookie';
// import { FaSpinner } from 'react-icons/fa';
import { ImSpinner } from 'react-icons/im';

import AllTransactions from '@/components/organisms/AllTransactions';
import DashboardLayout from '@/components/templates/DashboardLayout';

import { AuthContext } from 'context/AuthContext';
import { ProductContext } from '@/context/ProductContext';
import AllProducts from '@/components/organisms/AllProducts';
import callAPI from '@/config/api';
import toast from 'react-hot-toast';
import FullscreenLoading from '@/components/atoms/FullscreenLoading';

const token = Cookies.get('token');

const AllProductPage = () => {
  const [buff, setBuff] = useState('');
  const { getAllTransaction } = useContext(ProductContext);
  const [transactions, setTransactions] = useState(null);
  const { userLogout, setLoginStatus } = useContext(AuthContext);

  const handleLogout = () => {
    toast.promise(userLogout(), {
      loading: 'Mohon tunggu...',
      success: 'Berhasil Logout !',
      error: <b>Mohon maaf, telah terjadi kesalahan. Mohon coba lagi.</b>,
    });
    setLoginStatus(false);
  };

  const handleSocket = async () => {
    const res = await callAPI('/api/products', 'GET', null, token);
    setTransactions(res.data);
  };

  useEffect(() => {
    const socket = async () => {
      const response = await callAPI({
        path: '/api/transaction',
        method: 'GET',
        token,
      });
      setTransactions(response.data.data);
      console.log(response.data.data);
      alert(buff);
      setBuff('');
    };
    if (buff !== '') socket();
  }, [buff]);

  useEffect(() => {
    const getTransactions = async () => {
      const response = await getAllTransaction();
      console.log(response.data);
      return response.data;
    };
    getTransactions().then((res) => {
      setTransactions(res);
      // console.log(res);
    });
  }, []);

  if (typeof window !== 'undefined') {
    Echo.channel('Clover-channel').listen('.dashboard', (e) => {
      setBuff(e.event);
    });
  }
  return (
    <DashboardLayout handleLogout={handleLogout}>
      {transactions !== null ? <AllTransactions data={transactions} /> : <FullscreenLoading />}
      {/* <AllTransactions data={transactions} /> */}
    </DashboardLayout>
  );
};

// export const getServerSideProps = async (context) => {
//   // const token = Cookies.get('token');
//   const req = context.req;
//   const token = req.headers.cookie
//     .split(';')
//     .find((c) => c.trim().startsWith('token='))
//     .split('=')[1];
//   const { data } = await callAPI({
//     path: '/api/transaction',
//     method: 'GET',
//     token,
//   });

//   console.log(data);

//   // console.log('token', token);

//   return {
//     props: {
//       data,
//     },
//   };
// };

export default AllProductPage;

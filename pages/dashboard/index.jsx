import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { authGetRoles } from 'services/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';

import DashboardLayout from '@/components/templates/DashboardLayout';
import DashboardHomepage from '@/components/organisms/DashboardHomepage';
import toast from 'react-hot-toast';
import { useCartContext } from '@/context/CartContext';
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Logout', href: '#' },
];

const Dashboard = () => {
  const { setLoginStatus, loginStatus, userLogout } = useContext(AuthContext);
  const { state, dispatch } = useCartContext();

  const [userData, setUserData] = useState({
    fullname: '',
  });

  useEffect(() => {
    console.log(loginStatus);
    setUserData({ fullname: localStorage.getItem('fullname') });
  }, [loginStatus]);

  if (typeof window !== 'undefined') {
    Echo.channel('Clover-channel').listen('.dashboard', (e) => {
      console.log('ok');
      // alert(e)
    });
    // console.log('tes')
  }

  const handleLogout = () => {
    toast
      .promise(userLogout(), {
        loading: 'Mohon tunggu...',
        success: 'Berhasil Logout !',
        error: <b>Mohon maaf, telah terjadi kesalahan. Mohon coba lagi.</b>,
      })
      .then(() => {
        setLoginStatus(false);
        dispatch({ type: 'RESET_STATE' });
      });
  };

  return (
    <>
      <DashboardLayout user={userData.fullname} handleLogout={handleLogout}>
        <DashboardHomepage user={userData.fullname} />
      </DashboardLayout>
    </>
  );
};

// export async function getStaticProps() {
//   const res = await authGetRoles();
//   return {
//     props: {
//       roles: res.data,
//     },
//   };
// }

export default Dashboard;

import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { authGetRoles } from 'services/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';

import DashboardLayout from '@/components/templates/DashboardLayout';
import DashboardHomepage from '@/components/organisms/DashboardHomepage';
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
  const [userData, setUserData] = useState({
    username: '',
  });

  useEffect(() => {
    console.log(loginStatus);
    setUserData({ username: localStorage.getItem('username') });
  }, [loginStatus]);

  const handleLogout = () => {
    userLogout({ id: Cookies.get('id') });
    setLoginStatus(false);
  };

  return (
    <>
      <DashboardLayout handleLogout={handleLogout}>
        <DashboardHomepage user={userData.username} />
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

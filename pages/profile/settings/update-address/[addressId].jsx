import React from 'react';
import { Tab } from '@headlessui/react';
import { HiOutlineUserCircle, HiOutlineKey } from 'react-icons/hi';
import { GrMapLocation } from 'react-icons/gr';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';
import { classNames } from '@/utils/helpers';
import UserSettingsLayout from '@/components/templates/UserSettingsLayout';
import UserAddress from '@/components/organisms/UserAddress';
import { getUserAddress } from '@/services/user';
import callAPI, { callRajaOngkirAPI } from '@/config/api';
import UserNewAddress from '@/components/organisms/UserNewAddress';
import UserUpdateAddress from '@/components/organisms/UserUpdateAddress';

const UserUpdateAddressPage = ({ data }) => {
  return (
    <UserSettingsLayout>
      {/* <UserNewAddress data={data} /> */}
      <UserUpdateAddress data={data} />
    </UserSettingsLayout>
  );
};

// export const getServerSideProps = async (ctx) => {
//   const req = ctx.req;
//   const token = req.headers.cookie
//     .split(';')
//     .find((c) => c.trim().startsWith('token='))
//     .split('=')[1];
//   const { data } = await callAPI({
//     path: '/api/address',
//     method: 'GET',
//     token,
//   });

//   return {
//     props: {
//       data: data,
//     },
//   };
// };
export const getServerSideProps = async () => {
  const { data } = await callRajaOngkirAPI({
    path: '/api/province',
    method: 'GET',
  });

  return {
    props: {
      data,
    },
  };
};

UserUpdateAddressPage.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Update Address',
  },
};

export default UserUpdateAddressPage;

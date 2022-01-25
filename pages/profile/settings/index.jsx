/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { HiOutlineUserCircle, HiOutlineKey } from 'react-icons/hi';
import { GrMapLocation } from 'react-icons/gr';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';
import { classNames } from '@/utils/helpers';
import UserSettingsLayout from '@/components/templates/UserSettingsLayout';
import UserProfile from '@/components/organisms/UserProfile';

const ProfileSettings = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <UserSettingsLayout>
      <UserProfile />
    </UserSettingsLayout>
  );
};

ProfileSettings.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Profile Settings',
  },
};

export default ProfileSettings;

import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { HiOutlineUserCircle, HiOutlineKey } from 'react-icons/hi';
import { GrMapLocation, GrTransaction } from 'react-icons/gr';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';
import { classNames } from '@/utils/helpers';
import Link from 'next/link';
import { getUserProfile } from '@/services/user';
import Image from 'next/image';

const UserSettingsLayout = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});
  const userPhoto = useSelector((state) => state.user.user_photo);
  const userName = useSelector((state) => state.user.user_name);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserProfile();
      return data.data;
    };
    const response = async () =>
      getUser().then((data) => {
        return data;
      });
    response().then((data) => {
      setUserProfile(data);
    });
  }, []);

  const defaultPhoto = () => {
    const initalName = [];
    const name = userName;
    const split = name.split(' ');
    split.map((item) => initalName.push(item.charAt(0)));
    return initalName.join('');
  };

  return (
    <Main className='relative min-h-screen mb-6'>
      <div className='relative px-4 pt-20 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid grid-cols-4 gap-6'>
          <div>
            <div className='p-5 border border-gray-200 rounded-lg shadow-sm'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>User Profile</h3>
              </div>
              <div className='flex items-center justify-between pt-4 pb-4 border-b border-gray-200'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='w-12 h-12 rounded-full bg-neutral-focus text-neutral-content'>
                      {/* <span className='text-lg'>FM</span> */}
                      {Object.keys(userProfile).length > 0 && userProfile.photo !== null ? (
                        <Image
                          src={userPhoto !== '' ? userPhoto : userProfile.photo}
                          alt={'user profile'}
                          width={48}
                          height={48}
                          priority={true}
                          unoptimized={true} // for handle access for bidden
                          className='object-cover object-center rounded-lg'
                        />
                      ) : (
                        <span className='text-lg'>{defaultPhoto()}</span>
                      )}
                      {/* <Image
                        src={userProfile.photo}
                        alt={'user profile'}
                        width={48}
                        height={48}
                        priority={true}
                        unoptimized={true} // for handle access for bidden
                        className='object-cover object-center rounded-lg'
                      /> */}
                    </div>
                  </div>
                  <div className='ml-3'>
                    <div className='text-sm font-medium leading-5 text-gray-700'>
                      {userName !== '' ? userName : userProfile.fullname}
                    </div>
                  </div>
                </div>
              </div>
              <Link href={'/profile/settings'}>
                <a className='flex items-center justify-start w-full h-12 p-2 px-2 mt-2 text-gray-800 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-white'>
                  <span className='text-xl text-left text-gray-700'>
                    <HiOutlineUserCircle />
                  </span>
                  <span className='pl-2 mx-2 text-sm font-medium text-gray-700'>Biodata Diri</span>
                </a>
              </Link>
              <Link href={'/profile/settings/address'}>
                <a className='flex items-center justify-start w-full h-12 p-2 px-2 text-gray-800 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-white'>
                  <span className='text-xl text-left text-gray-700'>
                    <GrMapLocation />
                  </span>
                  <span className='pl-2 mx-2 text-sm font-medium text-gray-700'>Daftar Alamat</span>
                </a>
              </Link>
              {userProfile.email_verified_at && (
                <Link href={'/profile/order-list'}>
                  <a className='flex items-center justify-start w-full h-12 p-2 px-2 text-gray-800 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-white'>
                    <span className='text-xl text-left text-gray-700'>
                      <GrTransaction />
                    </span>
                    <span className='pl-2 mx-2 text-sm font-medium text-gray-700'>Daftar Transaksi</span>
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className='col-span-3'>
            <div className='p-5 border border-gray-200 rounded-lg shadow-sm'>{children}</div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default UserSettingsLayout;

import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { HiOutlineUserCircle, HiOutlineKey } from 'react-icons/hi';
import { GrMapLocation } from 'react-icons/gr';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';
import { classNames } from '@/utils/helpers';
import Link from 'next/link';

const UserSettingsLayout = ({ children }) => {
  return (
    <Main className='relative min-h-screen mb-6'>
      <div className='relative max-w-7xl px-4 pt-20 mx-auto sm:px-6 lg:px-8'>
        <div className='grid grid-cols-4 gap-6'>
          <div>
            <div className='p-5 border border-gray-200 rounded-lg shadow-sm'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>User Profile</h3>
              </div>
              <div className='flex items-center justify-between pt-4 border-b border-gray-200 pb-4'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='bg-neutral-focus text-neutral-content rounded-full w-12 h-12'>
                      <span className='text-lg'>FM</span>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <div className='text-sm leading-5 font-medium text-gray-700'>Farhan Mubarok</div>
                  </div>
                </div>
              </div>
              <Link href={'/profile/settings'}>
                <a className='hover:bg-gray-100 rounded-lg h-12 px-2 w-full text-gray-800 dark:text-white flex items-center p-2 mt-2 transition-colors duration-200 justify-start'>
                  <span className='text-left text-xl text-gray-700'>
                    <HiOutlineUserCircle />
                  </span>
                  <span className='mx-2 pl-2 text-gray-700 text-sm font-medium'>Biodata Diri</span>
                </a>
              </Link>
              <Link href={'/profile/settings/address'}>
                <a
                  className='hover:bg-gray-100 rounded-lg h-12 px-2 w-full text-gray-800 dark:text-white flex items-center p-2 transition-colors duration-200 justify-start'
                  href='#'>
                  <span className='text-left text-xl text-gray-700'>
                    <GrMapLocation />
                  </span>
                  <span className='mx-2 pl-2 text-gray-700 text-sm font-medium'>Daftar Alamat</span>
                </a>
              </Link>
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

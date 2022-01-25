import { HiBell, HiChevronDown, HiLogout, HiMenu } from 'react-icons/hi';
import logo from '@/assets/images/logo-clover.png';
import Image from 'next/image';
import Link from '../atoms/Link';
import { classNames } from '@/utils/helpers';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    current: true,
    icon: (
      <svg
        className='w-5 h-5 text-primary-500'
        width='20'
        height='20'
        fill='currentColor'
        viewBox='0 0 1792 1792'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z'></path>
      </svg>
    ),
  },
  {
    name: 'Produk',
    href: '/dashboard/all-products',
    current: false,
    icon: (
      <svg
        className='w-5 h-5 text-primary-500'
        width='20'
        height='20'
        fill='currentColor'
        viewBox='0 0 2048 1792'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z'></path>
      </svg>
    ),
  },
  // {
  //   name: 'Add Product',
  //   href: '/dashboard/add-product',
  //   current: false,
  //   icon: (
  //     <svg width='20' height='20' fill='currentColor' viewBox='0 0 2048 1792' xmlns='http://www.w3.org/2000/svg'>
  //       <path d='M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z'></path>
  //     </svg>
  //   ),
  // },
  {
    name: 'Transaksi',
    href: '/dashboard/transactions',
    current: false,
    icon: (
      <svg
        className='w-5 h-5 text-primary-500'
        width='20'
        height='20'
        fill='currentColor'
        viewBox='0 0 2048 1792'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z'></path>
      </svg>
    ),
  },
];

const DashboardLayout = ({ children, handleLogout, user }) => {
  const { asPath } = useRouter();

  return (
    <>
      <div className=''>
        <div className='flex'>
          <aside
            className={classNames('flex-none h-screen bg-white border border-gray-200 fixed z-50 inset-y-0 w-[250px]')}>
            <nav className='h-full px-2 py-4'>
              <div className='flex flex-col justify-between h-full'>
                <div>
                  <div className='relative flex items-center justify-center'>
                    <Link href='/'>
                      <Image src={logo} alt='Logo' width={150} height={52} />
                    </Link>
                  </div>
                  <div className='py-2 pt-5'>
                    <ul className='flex flex-col'>
                      {navigation.map((item, idx) => (
                        <li key={idx} className='pb-2'>
                          <Link
                            href={item.href}
                            className={classNames(
                              'flex items-center px-3 py-2 space-x-3 rounded-lg hover:bg-gray-200 font-semibold',
                              asPath === item.href ? 'bg-primary-100/75 text-gray-700' : 'text-gray-500',
                            )}>
                            {item.icon}
                            <span className='text-sm'>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <button
                    type='button'
                    onClick={() => handleLogout()}
                    className='flex items-center justify-center w-full py-2 space-x-2 text-sm font-semibold text-white rounded-lg bg-rose-400'>
                    <HiLogout className='w-5 h-5' />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </nav>
          </aside>
          <div className={classNames('relative grow ml-[250px] overflow-x-hidden')}>
            <div className='flex flex-col'>
              <nav className='fixed bg-white right-0 z-50 left-[250px] border-b border-gray-200'>
                <div className='flex items-center justify-between h-16 mx-5'>
                  <div></div>
                  <div className='flex items-center'>
                    <button type='button' className='p-3'>
                      <HiBell className='w-5 h-5 text-gray-500' />
                    </button>
                    <Menu as='div' className='relative inline-block text-left'>
                      <div>
                        <Menu.Button className='flex items-center px-4 py-2 text-sm rounded-lg'>
                          {user}
                          <HiChevronDown
                            className='w-5 h-5 ml-2 -mr-1 text-gray-700 hover:text-gray-800'
                            aria-hidden='true'
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <div className='py-1'>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href='/profile/settings'
                                  className={`${
                                    active ? 'bg-gray-200 text-gray-700' : 'text-gray-800'
                                  } group flex items-center w-full py-2 px-3 text-sm`}>
                                  Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href='/profile/settings'
                                  className={`${
                                    active ? 'bg-gray-200 text-gray-700' : 'text-gray-800'
                                  } group flex items-center w-full py-2 px-3 text-sm`}>
                                  Profile Settings
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type='button'
                                  onClick={() => handleLogout()}
                                  className={`${
                                    active ? 'bg-gray-200 text-gray-700' : 'text-gray-800'
                                  } group flex items-center w-full py-2 px-3 text-sm`}>
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </nav>
              <main className='pt-16 my-4 overflow-hidden'>{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

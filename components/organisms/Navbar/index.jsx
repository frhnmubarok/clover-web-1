import * as React from 'react';
import Image from 'next/image';
import { Dialog, Menu, Popover, Transition } from '@headlessui/react';
import { HiChevronDown, HiChevronUp, HiOutlineBell, HiOutlineMenuAlt1, HiSearch } from 'react-icons/hi';
import { BiStore } from 'react-icons/bi';
import { MdOutlineTouchApp } from 'react-icons/md';

import { AuthContext } from '@/context/AuthContext';

import Link from '../../atoms/Link';
import Mobile from './Mobile';
import logo from '@/assets/images/logo-clover.png';

import { classNames, formatRupiah } from '@/utils/helpers';
import { ExternalLinkIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useCartContext } from '@/context/CartContext';
import axios from 'axios';

const navigation = {
  categories: [
    {
      id: 'category',
      name: 'Kategori',
      featured: [
        {
          name: 'Sayur - Sayuran Segar Dari Petani Clover',
          href: '#',
          imageSrc: `https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80`,
          imageAlt: 'Sayur - Sayuran Segar Dari Petani Clove',
        },
        {
          name: 'Buah - Buahan Segar Dari Petani Clover',
          href: '#',
          imageSrc: `https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80`,
          imageAlt: 'Buah - Buahan Segar Dari Petani Clover',
        },
      ],
      sections: [
        {
          id: 'vegetable',
          name: 'Sayur - Sayuran',
          items: [{ name: 'Browse All', href: '#' }],
        },
        {
          id: 'fruit',
          name: 'Buah - Buahan',
          items: [{ name: 'Browse All', href: '#' }],
        },
      ],
    },
  ],
  pages: [{ name: 'Wishlist', href: '/wishlist' }],
};

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { loginStatus, userLogout, setLoginStatus } = React.useContext(AuthContext);

  const [userLoggedIn, setUserLoggedIn] = React.useState(null);

  const { state, dispatch } = useCartContext();
  const [get, setGet] = React.useState(true);
  const [buff, setBuff] = React.useState(0);
  if (typeof window !== 'undefined') {
    if (get && Cookies.get('token') && buff == 0) {
      setBuff(1);
      setGet(false);
      axios({
        method: 'GET',
        url: 'https://dev-api-clover.herokuapp.com/api/carts',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token'),
        },
      }).then((data) => {
        dispatch({
          type: 'GET_CARTS',
          payload: data.data.data.carts,
        });
        console.log('ok');
      });
    }

    if (buff > 0) {
      setTimeout(() => {
        setBuff(0);
      }, 5000);
    } else {
      Echo.channel('Clover-channel').listen('.cart', (e) => {
        if (buff == 0) {
          setBuff(1);
          setGet(true);
        }
      });
    }
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserLoggedIn(localStorage.getItem('fullname'));
    }
  }, []);

  React.useEffect(() => {
    for (let i = 0; i < Object.keys(state.cart).length; i++) {
      //
    }
  }, [state.cart]);

  const handleLogout = () => {
    toast.promise(userLogout(), {
      loading: 'Mohon tunggu...',
      success: 'Berhasil Logout !',
      error: <b>Mohon maaf, telah terjadi kesalahan. Mohon coba lagi.</b>,
    });
    setLoginStatus(false);
  };

  return (
    <div className='bg-white'>
      {/* Mobile Menu */}
      <Mobile navigation={navigation} open={open} setOpen={setOpen} />

      {/* Desktop Menu */}
      <header className='relative'>
        <nav aria-label='Top' className='fixed inset-x-0 top-0 z-30 bg-white backdrop-blur-sm'>
          <div className='border-b border-gray-200'>
            <div className='container flex items-center h-16'>
              <button type='button' onClick={() => setOpen(true)} className='text-gray-700 rounded-lg lg:hidden'>
                <span className='sr-only'>Open menu</span>
                <HiOutlineMenuAlt1 className='w-6 h-6' aria-hidden='true' />
              </button>

              {/* Logo */}
              <div className='flex ml-4 lg:ml-0'>
                <Link href='/' className='flex items-center flex-shrink-0 w-24 h-auto md:w-28'>
                  <Image src={logo} alt='Logo' className='object-cover object-center' />
                </Link>
              </div>

              {/* Flyout Menus */}
              <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='flex h-full space-x-1'>
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className='flex font-sans'>
                      {({ open }) => (
                        <>
                          <div className='relative flex items-center justify-center'>
                            <Popover.Button
                              className={classNames(
                                open && 'bg-gray-200 text-primary-500',
                                'border border-transparent relative z-10 flex justify-center items-center space-x-2 transition-colors ease-out duration-200 text-sm font-semibold pl-4 pr-[10px] py-2 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-gray-200',
                              )}>
                              <span>{category.name}</span>
                              {open ? (
                                <HiChevronUp className='w-5 h-5' aria-hidden='true' />
                              ) : (
                                <HiChevronDown className='w-5 h-5' aria-hidden='true' />
                              )}
                            </Popover.Button>
                          </div>
                          <Transition
                            as={React.Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'>
                            <Popover.Panel className='absolute inset-x-0 text-sm text-gray-500 top-full'>
                              <div className='absolute inset-0 bg-white shadow-md top-1/2' aria-hidden='true' />
                              <div className='relative bg-white'>
                                <div className='container'>
                                  <div className='grid grid-cols-2 py-16 gap-y-10 gap-x-8'>
                                    <div className='grid grid-cols-2 col-start-2 gap-x-8'>
                                      {category.featured.map((item) => (
                                        <div key={item.name} className='relative text-base group sm:text-sm'>
                                          <div className='relative overflow-hidden duration-150 ease-in-out bg-gray-100 rounded-lg aspect-square group-hover:opacity-75'>
                                            <Image
                                              layout='fill'
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className='object-cover object-center'
                                            />
                                          </div>
                                          <Link href={item.href} className='block mt-6 font-medium text-gray-900'>
                                            <span className='absolute inset-0 z-10' aria-hidden='true' />
                                            {item.name}
                                          </Link>
                                          <p aria-hidden='true' className='inline mt-1'>
                                            Lihat Detail
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className='grid grid-cols-3 row-start-1 text-sm gap-y-10 gap-x-8'>
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className='font-medium text-gray-900'>
                                            {section.name}
                                          </p>
                                          <ul
                                            role='list'
                                            aria-labelledby={`${section.name}-heading`}
                                            className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'>
                                            {section.items.map((item) => (
                                              <li key={item.name} className='flex'>
                                                <Link href={item.href} className='hover:text-gray-800'>
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                  <div className='relative flex items-center justify-center space-x-1'>
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        className={classNames(
                          open && 'bg-gray-200 text-primary-500',
                          'border border-transparent relative z-10 flex justify-center items-center space-x-2 transition-colors ease-out duration-200 text-sm font-semibold px-4 py-2 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-gray-200',
                        )}>
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Group>

              <div className='flex items-center ml-auto'>
                <div className='flex mr-2'>
                  <button
                    type='button'
                    className='flex justify-center items-center space-x-2 text-gray-700 border border-gray-200 px-2 py-[5px] sm:pl-2 sm:pr-[5px] rounded-lg text-sm duration-100 ease-in-out'>
                    <HiSearch className='w-4 h-4' />
                    <span className='hidden text-sm sm:block lg:hidden xl:block'>Search</span>
                    <MdOutlineTouchApp className='block w-5 h-5 text-gray-700 sm:hidden' />
                    <span className='hidden sm:block text-gray-400 text-xs leading-5 py-[1px] px-1.5 border border-gray-200 rounded-md'>
                      <kbd className='font-sans'>
                        <abbr title='Control'>Ctrl </abbr>
                      </kbd>
                      <kbd className='font-sans'>K</kbd>
                    </span>
                  </button>
                </div>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2'>
                  {loginStatus ? (
                    <>
                      <Menu as='div' className='relative inline-block text-left'>
                        <div>
                          <Menu.Button className='inline-flex justify-center w-full py-2 pl-4 pr-3 text-sm font-medium text-white rounded-md bg-primary-500 hover:bg-primary-600 focus:outline-none '>
                            {userLoggedIn ?? 'Customer'}
                            <HiChevronDown
                              className='w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100'
                              aria-hidden='true'
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={React.Fragment}
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
                                  <button
                                    className={`${
                                      active ? 'bg-primary-500/80 text-white' : 'text-gray-900'
                                    } group flex items-center w-full px-4 py-2 text-sm`}>
                                    Profile
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href={'/profile/settings'}>
                                    <a
                                      className={`${
                                        active ? 'bg-primary-500/80 text-white' : 'text-gray-900'
                                      } group flex items-center w-full px-4 py-2 text-sm`}>
                                      Pengaturan Akun
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                            <div className='py-1'>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? 'bg-primary-500/80 text-white' : 'text-gray-900'
                                    } group flex items-center w-full px-4 py-2 text-sm`}
                                    onClick={handleLogout}>
                                    Logout
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <Link href='/dashboard' className='p-2'>
                        <BiStore className='w-5 h-5' />
                      </Link>
                      <button type='button' className='relative p-2'>
                        <div className='absolute right-[10px]'>
                          <span className='relative flex w-2 h-2'>
                            <span className='absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400'></span>
                            <span className='relative inline-flex w-2 h-2 rounded-full bg-sky-500'></span>
                          </span>
                        </div>
                        <HiOutlineBell className='w-5 h-5' />
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href='/login'
                        className='inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:text-primary-500'>
                        Masuk
                      </Link>
                      <span className='w-px h-5 bg-gray-200' aria-hidden='true' />
                      <Link
                        href='/register'
                        className='inline-flex items-center justify-center px-4 py-2 text-sm text-white rounded-lg bg-primary-500 hover:bg-primary-600'>
                        <span className='block xl:hidden'>Daftar</span>
                        <span className='hidden xl:block'>Buat Akun Baru</span>
                      </Link>
                    </>
                  )}
                  <Link href='/cart' className={'relative bg-gray-200 p-2 rounded-lg hover:bg-gray-200'}>
                    <div
                      className={classNames(
                        state.cart.length > 0 ? 'block' : 'hidden',
                        'absolute py-px px-[6px] text-white rounded-md text-xs -top-2 -right-2 bg-sky-500',
                      )}>
                      {state.cart.length}
                    </div>
                    <ShoppingCartIcon className={'hover:text-sky-500 w-5 h-5'} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

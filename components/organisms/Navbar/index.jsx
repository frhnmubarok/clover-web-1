import * as React from 'react';
import Image from 'next/image';
import { Dialog, Menu, Popover, Transition } from '@headlessui/react';
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineBell,
  HiOutlineMenuAlt1,
  HiSearch,
} from 'react-icons/hi';
import { MdOutlineTouchApp } from 'react-icons/md';

import { AuthContext } from '@/context/AuthContext';

import Link from '../../atoms/Link';
import Mobile from './Mobile';
import logo from '@/assets/images/logo-clover.png';

import { classNames, formatRupiah } from '@/utils/helpers';
import { ShoppingCartIcon, XIcon } from '@heroicons/react/outline';

const products = [
  {
    id: 1,
    name: 'Jeruk Manis',
    href: '#',
    category: 'Buah - buahan',
    price: 200000,
    quantity: 1,
    imageSrc: '/images/products/jeruk.png',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Sayur Kol',
    href: '#',
    category: 'Sayur - sayuran',
    price: 200000,
    quantity: 1,
    imageSrc: '/images/products/kol.png',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
];

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
  pages: [{ name: 'Favorit', href: '/favorit' }],
};

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  const { loginStatus } = React.useContext(AuthContext);

  return (
    <div className="bg-white">
      {/* Mobile Menu */}
      <Mobile navigation={navigation} open={open} setOpen={setOpen} />

      {/* Desktop Menu */}
      <header className="relative">
        <nav
          aria-label="Top"
          className="fixed inset-x-0 top-0 z-30 bg-white backdrop-blur-sm"
        >
          <div className="border-b border-gray-200">
            <div className="container flex items-center h-16">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-gray-700 rounded-lg lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <HiOutlineMenuAlt1 className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="flex ml-4 lg:ml-0">
                <Link
                  href="/"
                  className="flex items-center flex-shrink-0 w-24 h-auto md:w-28"
                >
                  <Image
                    src={logo}
                    alt="Logo"
                    className="object-cover object-center"
                  />
                </Link>
              </div>

              {/* Flyout Menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-1">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex font-sans">
                      {({ open }) => (
                        <>
                          <div className="relative flex items-center justify-center">
                            <Popover.Button
                              className={classNames(
                                open && 'bg-gray-200 text-primary-500',
                                'border border-transparent relative z-10 flex justify-center items-center space-x-2 transition-colors ease-out duration-200 text-sm font-semibold pl-4 pr-[10px] py-2 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-gray-200'
                              )}
                            >
                              <span>{category.name}</span>
                              {open ? (
                                <HiChevronUp
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <HiChevronDown
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              )}
                            </Popover.Button>
                          </div>
                          <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
                              <div
                                className="absolute inset-0 bg-white shadow-md top-1/2"
                                aria-hidden="true"
                              />
                              <div className="relative bg-white">
                                <div className="container">
                                  <div className="grid grid-cols-2 py-16 gap-y-10 gap-x-8">
                                    <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="relative text-base group sm:text-sm"
                                        >
                                          <div className="relative overflow-hidden duration-150 ease-in-out bg-gray-100 rounded-lg aspect-square group-hover:opacity-75">
                                            <Image
                                              layout="fill"
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link
                                            href={item.href}
                                            className="block mt-6 font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </Link>
                                          <p
                                            aria-hidden="true"
                                            className="inline mt-1"
                                          >
                                            Lihat Detail
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="grid grid-cols-3 row-start-1 text-sm gap-y-10 gap-x-8">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <Link
                                                  href={item.href}
                                                  className="hover:text-gray-800"
                                                >
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
                  <div className="relative flex items-center justify-center space-x-1">
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        className={classNames(
                          open && 'bg-gray-200 text-primary-500',
                          'border border-transparent relative z-10 flex justify-center items-center space-x-2 transition-colors ease-out duration-200 text-sm font-semibold px-4 py-2 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-gray-200'
                        )}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Group>

              <div className="flex items-center ml-auto">
                <div className="flex mr-2">
                  <button
                    type="button"
                    className="flex justify-center items-center space-x-2 text-gray-700 border border-gray-200 px-2 py-[5px] sm:pl-2 sm:pr-[5px] rounded-lg text-sm duration-100 ease-in-out"
                  >
                    <HiSearch className="w-4 h-4" />
                    <span className="hidden text-sm sm:block lg:hidden xl:block">
                      Search
                    </span>
                    <MdOutlineTouchApp className="block w-5 h-5 text-gray-700 sm:hidden" />
                    <span className="hidden sm:block text-gray-400 text-xs leading-5 py-[1px] px-1.5 border border-gray-200 rounded-md">
                      <kbd className="font-sans">
                        <abbr title="Control">Ctrl </abbr>
                      </kbd>
                      <kbd className="font-sans">K</kbd>
                    </span>
                  </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2">
                  {loginStatus ? (
                    <>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center w-full py-2 pl-4 pr-3 text-sm font-medium text-white rounded-md bg-primary-500 hover:bg-primary-600 focus:outline-none ">
                            Fahmi Idris
                            <HiChevronDown
                              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-primary-500/80 text-white'
                                        : 'text-gray-900'
                                    } group flex items-center w-full px-4 py-2 text-sm`}
                                  >
                                    Profile
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-primary-500/80 text-white'
                                        : 'text-gray-900'
                                    } group flex items-center w-full px-4 py-2 text-sm`}
                                  >
                                    Pengaturan Akun
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-primary-500/80 text-white'
                                        : 'text-gray-900'
                                    } group flex items-center w-full px-4 py-2 text-sm`}
                                  >
                                    Logout
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <button type="button" className="p-2">
                        <HiOutlineBell className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:text-primary-500"
                      >
                        Masuk
                      </Link>
                      <span
                        className="w-px h-5 bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        href="/register"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm text-white rounded-lg bg-primary-500 hover:bg-primary-600"
                      >
                        <span className="block xl:hidden">Daftar</span>
                        <span className="hidden xl:block">Buat Akun Baru</span>
                      </Link>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenCart(true)}
                    className={classNames(
                      open && 'bg-gray-200',
                      'p-2 rounded-lg hover:bg-gray-200'
                    )}
                  >
                    <ShoppingCartIcon
                      className={classNames(open && 'text-sky-500', 'w-5 h-5')}
                    />
                  </button>
                  <Transition.Root show={openCart} as={React.Fragment}>
                    <Dialog
                      as="div"
                      className="fixed inset-0 z-50 overflow-hidden"
                      onClose={setOpenCart}
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                          as={React.Fragment}
                          enter="ease-in-out duration-500"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in-out duration-500"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                          <Transition.Child
                            as={React.Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                          >
                            <div className="w-screen max-w-md">
                              <div className="flex flex-col h-full overflow-y-auto bg-white shadow-xl">
                                <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                                  <div className="flex items-start justify-between">
                                    <Dialog.Title className="text-lg font-medium text-gray-900">
                                      Keranjang Belanja
                                    </Dialog.Title>
                                    <div className="flex items-center ml-3 h-7">
                                      <button
                                        type="button"
                                        className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                                        onClick={() => setOpenCart(false)}
                                      >
                                        <span className="sr-only">
                                          Close panel
                                        </span>
                                        <XIcon
                                          className="w-6 h-6"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="mt-8">
                                    <div className="flow-root">
                                      <ul
                                        role="list"
                                        className="-my-6 divide-y divide-gray-200"
                                      >
                                        {products.map((product) => (
                                          <li
                                            key={product.id}
                                            className="flex py-6"
                                          >
                                            <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                              <Image
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                layout="fill"
                                                className="object-cover object-center w-full h-full"
                                              />
                                            </div>

                                            <div className="flex flex-col flex-1 ml-4">
                                              <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                  <h3>
                                                    <a href={product.href}>
                                                      {product.name}
                                                    </a>
                                                  </h3>
                                                  <p className="ml-4">
                                                    {formatRupiah(
                                                      product.price
                                                    )}
                                                  </p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                  {product.category}
                                                </p>
                                              </div>
                                              <div className="flex items-end justify-between flex-1 text-sm">
                                                <p className="text-gray-500">
                                                  Jumlah {product.quantity}
                                                </p>

                                                <div className="flex">
                                                  <button
                                                    type="button"
                                                    className="font-medium text-primary-600 hover:text-primary-500"
                                                  >
                                                    Hapus
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Harga</p>
                                    <p>{formatRupiah(100000)}</p>
                                  </div>
                                  <p className="mt-0.5 text-sm text-gray-500">
                                    Pengiriman dan pajak dihitung saat checkout.
                                  </p>
                                  <div className="mt-6">
                                    <button
                                      type="button"
                                      className="flex items-center justify-center w-full px-6 py-2 text-base font-medium text-white duration-200 ease-in-out border border-transparent rounded-lg shadow-sm bg-primary-500 hover:bg-primary-600 hover:ring-2 hover:ring-sky-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                    >
                                      Checkout
                                    </button>
                                  </div>
                                  <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                                    <p>
                                      atau{' '}
                                      <button
                                        type="button"
                                        className="font-medium text-primary-500 hover:text-primary-600"
                                        onClick={() => setOpenCart(false)}
                                      >
                                        Lanjut Belanja
                                        <span aria-hidden="true"> &rarr;</span>
                                      </button>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

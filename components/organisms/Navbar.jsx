import * as React from "react";
import Image from "next/image";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineMenuAlt1,
  HiSearch,
  HiX,
} from "react-icons/hi";
import { MdOutlineTouchApp } from "react-icons/md";

import Link from "../atoms/Link";
import logo from "@/assets/images/logo-clover.png";

import { classNames } from "@/utils/helpers";

const navigation = {
  categories: [
    {
      id: "category",
      name: "Kategori",
      featured: [
        {
          name: "Sayur - Sayuran Segar Dari Petani Clover",
          href: "#",
          imageSrc: `https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80`,
          imageAlt: "Sayur - Sayuran Segar Dari Petani Clove",
        },
        {
          name: "Buah - Buahan Segar Dari Petani Clover",
          href: "#",
          imageSrc: `https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80`,
          imageAlt: "Buah - Buahan Segar Dari Petani Clover",
        },
      ],
      sections: [
        {
          id: "vegetable",
          name: "Sayur - Sayuran",
          items: [{ name: "Browse All", href: "#" }],
        },
        {
          id: "fruit",
          name: "Buah - Buahan",
          items: [{ name: "Browse All", href: "#" }],
        },
      ],
    },
  ],
  pages: [{ name: "Favorit", href: "/favorit" }],
};

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-white">
      {/* Mobile Menu */}
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <HiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-2 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Masuk
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Daftar
                  </a>
                </div>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-primary-500 border-primary-500"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={React.Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel
                      key={category.name}
                      className="pt-10 pb-8 px-4 space-y-10"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <div className="relative aspect-square rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <Image
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover"
                                layout="fill"
                              />
                            </div>
                            <a
                              href={item.href}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute z-10 inset-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Lihat Detail
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="font-medium text-gray-900"
                          >
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a
                                  href={item.href}
                                  className="-m-2 p-2 block text-gray-500"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Desktop Menu */}
      <header className="relative">
        <nav
          aria-label="Top"
          className="backdrop-blur-sm bg-white fixed top-0 inset-x-0 z-30"
        >
          <div className="border-b border-gray-200">
            <div className="container h-16 flex items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-lg text-gray-700 lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <HiOutlineMenuAlt1 className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link
                  href="/"
                  className="flex-shrink-0 flex items-center h-auto w-24 md:w-28"
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
                <div className="h-full flex space-x-1">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex font-">
                      {({ open }) => (
                        <>
                          <div className="relative flex justify-center items-center">
                            <Popover.Button
                              className={classNames(
                                open && "bg-gray-200 text-primary-500",
                                "border border-transparent relative z-10 flex justify-center items-center space-x-2 transition-colors ease-out duration-200 text-sm font-semibold pl-4 pr-[10px] py-2 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-gray-200"
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
                            <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow-md"
                                aria-hidden="true"
                              />
                              <div className="relative bg-white">
                                <div className="container">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="relative aspect-square rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 duration-150 ease-in-out">
                                            <Image
                                              layout="fill"
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <Link
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute z-10 inset-0"
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
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
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
                  <div className="relative flex justify-center items-center space-x-1">
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        className={classNames(
                          open && "bg-gray-200 text-primary-500",
                          "border border-transparent relative z-10 flex justify-center items-center space-x-2 transition-colors ease-out duration-200 text-sm font-semibold px-4 py-2 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-gray-200"
                        )}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="flex mr-2">
                  <button
                    type="button"
                    className="flex justify-center items-center space-x-2 text-gray-700 border border-gray-200 px-2 py-[5px] sm:pl-2 sm:pr-[5px] rounded-lg text-sm duration-100 ease-in-out"
                  >
                    <HiSearch className="w-4 h-4" />
                    <span className="text-sm hidden sm:block lg:hidden xl:block">
                      Search
                    </span>
                    <MdOutlineTouchApp className="block sm:hidden w-5 h-5 text-gray-700" />
                    <span className="hidden sm:block text-gray-400 text-xs leading-5 py-[1px] px-1.5 border border-gray-200 rounded-md">
                      <kbd className="font-sans">
                        <abbr title="Control">Ctrl </abbr>
                      </kbd>
                      <kbd className="font-sans">K</kbd>
                    </span>
                  </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2">
                  <Link
                    href="/login"
                    className="inline-flex justify-center items-center text-sm text-gray-700 hover:text-primary-500 font-semibold bg-gray-200 px-4 py-2 rounded-lg"
                  >
                    Masuk
                  </Link>
                  <span className="h-5 w-px bg-gray-200" aria-hidden="true" />
                  <Link
                    href="/register"
                    className="inline-flex justify-center items-center text-sm text-white bg-primary-500 px-4 py-2 rounded-lg hover:bg-primary-600"
                  >
                    <span className="block xl:hidden">Daftar</span>
                    <span className="hidden xl:block">Buat Akun Baru</span>
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

import * as React from 'react';
import Image from 'next/image';
import { HiX } from 'react-icons/hi';
import { Transition, Dialog, Tab } from '@headlessui/react';

import Link from '../../atoms/Link';

import { classNames } from '@/utils/helpers';

export default function Mobile({ navigation, open, setOpen }) {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex lg:hidden"
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
          <div className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <HiX className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="px-4 py-6 mt-2 space-y-6">
              <div className="flow-root">
                <Link
                  href="/login"
                  className="block p-2 -m-2 font-medium text-gray-900"
                >
                  Masuk
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  href="/register"
                  className="block p-2 -m-2 font-medium text-gray-900"
                >
                  Daftar
                </Link>
              </div>
            </div>

            {/* Links */}
            <Tab.Group as="div" className="">
              <div className="border-b border-gray-200">
                <Tab.List className="flex px-4 -mb-px space-x-8">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'text-primary-500 border-primary-500'
                            : 'text-gray-900 border-transparent',
                          'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
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
                    className="px-4 pt-10 pb-8 space-y-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="relative text-sm group">
                          <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square group-hover:opacity-75">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              className="object-cover object-center"
                              layout="fill"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="block mt-6 font-medium text-gray-900"
                          >
                            <span
                              className="absolute inset-0 z-10"
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
                          className="flex flex-col mt-6 space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="block p-2 -m-2 text-gray-500"
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

            <div className="px-4 py-6 space-y-6 border-t border-gray-200">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="block p-2 -m-2 font-medium text-gray-900"
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
  );
}

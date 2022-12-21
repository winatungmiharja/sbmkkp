import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  HiOutlineDocumentAdd,
  HiOutlineDocumentSearch,
  HiOutlineDocumentText,
  HiOutlineX,
} from 'react-icons/hi';

import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/Logo';

import useAuthStore from '@/store/useAuthStore';

//#region  //*=========== Role Navigation ===========
const panitiaNav = [
  {
    name: 'Data Pendaftaran',
    href: '/panitia/berkas',
    icon: HiOutlineDocumentText,
  },
  {
    name: 'Data Jadwal',
    href: '/panitia/jadwal',
    icon: HiOutlineDocumentSearch,
  },
];

const pendaftarNav = [
  {
    name: 'Ajukan Pendaftaran',
    href: '/pendaftar/berkas',
    icon: HiOutlineDocumentAdd,
  },
  {
    name: 'Riwayat Pendaftaran',
    href: '/pendaftar/riwayat',
    icon: HiOutlineDocumentText,
  },
];
const navigationObj = {
  panitia: panitiaNav,
  pendaftar: pendaftarNav,
};
//#endregion  //*======== Role Navigation ===========

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const router = useRouter();
  const { pathname } = router;

  //#region  //*=========== Role Conditional Sidebar ===========
  const user = useAuthStore.useUser();
  const role = user?.role ?? 'pendaftar';

  const navigation = navigationObj[role];
  //#endregion  //*======== Role Conditional Sidebar ===========

  return (
    <>
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as='div'
          className='flex fixed inset-0 z-40 md:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='flex relative flex-col flex-1 pt-5 pb-4 w-full max-w-xs bg-white'>
              <Transition.Child
                as={React.Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 pt-2 -mr-12'>
                  <button
                    type='button'
                    className='flex justify-center items-center ml-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-inset focus:ring-white focus:outline-none'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <HiOutlineX
                      className='w-6 h-6 text-white'
                      aria-hidden='true'
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex flex-shrink-0 justify-center items-center px-4'>
                <Logo />
              </div>
              <div className='overflow-y-auto flex-1 mt-5 h-0'>
                <nav className='px-2 space-y-1'>
                  {navigation.map((item) => (
                    <UnstyledLink
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        pathname.includes(item.href)
                          ? 'bg-primary-50 text-primary-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={clsx(
                          pathname.includes(item.href)
                            ? 'text-primary-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 mr-4 w-6 h-6'
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </UnstyledLink>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className='hidden md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex overflow-y-auto flex-col flex-grow pt-5 pb-4 border-r border-gray-200'>
            <div className='flex flex-shrink-0 justify-center items-center px-4'>
              <Logo />
            </div>
            <div className='flex flex-col flex-grow mt-5'>
              <nav className='flex-1 px-2 space-y-1 bg-white'>
                {navigation.map((item) => {
                  return (
                    <UnstyledLink
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        pathname.includes(item.href)
                          ? 'bg-primary-50 text-primary-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={clsx(
                          pathname.includes(item.href)
                            ? 'text-primary-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 mr-3 w-6 h-6'
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </UnstyledLink>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

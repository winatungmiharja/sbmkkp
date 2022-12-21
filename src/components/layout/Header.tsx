/* eslint-disable @next/next/no-img-element */
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

import UnstyledLink from '@/components/links/UnstyledLink';

import useAuthStore from '@/store/useAuthStore';

type HeaderProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setSidebarOpen }: HeaderProps) {
  //#region  //*=========== Store ===========
  const user = useAuthStore.useUser();
  const logout = useAuthStore.useLogout();
  //#endregion  //*======== Store ===========

  const userNavigation = [{ name: 'Profil', href: `/${user?.role}/profil` }];

  /** No need to redirect, because it is handled in PrivateRoute */
  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex relative z-40 flex-shrink-0 h-16 bg-white border-b border-gray-200'>
      <button
        type='button'
        className='px-4 text-gray-500 border-r border-gray-200 md:hidden focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none'
        onClick={() => setSidebarOpen(true)}
      >
        <span className='sr-only'>Open sidebar</span>
        <HiOutlineMenuAlt2 className='w-6 h-6' aria-hidden='true' />
      </button>
      <div className='flex flex-1 justify-between items-center px-4 md:px-1'>
        <div className='flex flex-1'>
          <h4 className='capitalize'>Akun {user?.role && user.role}</h4>
        </div>
        <div className='flex items-center ml-4 md:ml-6'>
          {/* Profile dropdown */}
          <Menu as='div' className='relative ml-3'>
            <div>
              <Menu.Button className='flex items-center max-w-xs text-sm rounded-full focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none'>
                <span className='sr-only'>Open user menu</span>
                <img
                  className='w-8 h-8 rounded-full'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
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
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none'>
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <UnstyledLink
                        href={`${item.href}`}
                        className={clsx(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </UnstyledLink>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 w-full text-sm text-left'
                      )}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

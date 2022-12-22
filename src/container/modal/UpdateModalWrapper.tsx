import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { HiCheck, HiOutlinePencil, HiOutlineX, HiX } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';

import { StatusBerkas } from '@/types/api';

export default function UpdateModalWrapper({
  children,
  title,
  setEdit,
  isEdit,
  onDelete,
  onConfirmed,
  onCloseModal,
  status,
}: {
  children: React.ReactNode;
  title: string;
  setEdit: (value: React.SetStateAction<boolean>) => void;
  isEdit: boolean;
  onDelete: () => void;
  onConfirmed: () => void;
  onCloseModal: () => void;
  status: keyof typeof StatusBerkas;
}) {
  return (
    <>
      <div className='flex gap-2 justify-end w-full'>
        {/* Confrim Button */}
        {status === 'pending' && (
          <Button
            variant='ghost'
            className={clsx()}
            onClick={() => onConfirmed()}
          >
            <span className='inline-flex gap-2'>
              <HiCheck size={16} /> <p>Konfirmasi</p>
            </span>
          </Button>
        )}
        {/* Edit Button */}
        <Button variant='ghost' onClick={() => setEdit(true)}>
          <HiOutlinePencil size={16} />
        </Button>
        {/* Close Button */}
        {status !== 'verified' && (
          <Button variant='ghost' className={clsx()} onClick={() => onDelete()}>
            <HiX size={16} />
          </Button>
        )}
      </div>
      {/* Edit Modal */}
      <Transition.Root show={isEdit} as={React.Fragment}>
        <Dialog
          as='div'
          static
          className='overflow-y-auto fixed inset-0 z-40'
          onClose={setEdit}
        >
          <div className='flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:h-screen sm:align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block overflow-hidden z-auto px-4 pt-5 pb-4 w-full text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:p-6 sm:my-8 sm:max-w-lg sm:align-middle'>
                <div className='hidden absolute top-0 right-0 pt-4 pr-4 sm:block'>
                  <button
                    type='button'
                    className={clsxm(
                      'text-gray-400 bg-white rounded-md hover:text-gray-500',
                      'focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none',
                      'disabled:filter disabled:brightness-90 disabled:cursor-wait'
                    )}
                    onClick={onCloseModal}
                  >
                    <span className='sr-only'>Close</span>
                    <HiOutlineX className='w-6 h-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='sm:flex sm:items-center'>
                  <div
                    className={clsxm(
                      'flex flex-shrink-0 justify-center items-center rounded-full',
                      'mx-auto w-12 h-12 sm:mx-0 sm:w-10 sm:h-10',
                      'bg-yellow-100'
                    )}
                  >
                    <HiOutlinePencil
                      className={clsxm('w-6 h-6', 'text-yellow-500')}
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                </div>
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

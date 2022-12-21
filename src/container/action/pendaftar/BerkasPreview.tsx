import { Dialog, Transition } from '@headlessui/react';
import { lookup } from 'mime-types';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  HiOutlineDocumentText,
  HiOutlinePencil,
  HiOutlineX,
} from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';

import { Berkas } from '@/types/api';

export default function BerkasPreview({ data }: { data: Berkas }) {
  // edit modal state
  const [isEdit, setIsEdit] = React.useState(false);

  const berkasDefaultValues = {
    foto_formal: [
      {
        preview: data.foto_formal,
        name: 'Foto Formal',
        type: lookup(data.foto_formal + ''),
      },
    ],
    foto_ktp: [
      {
        preview: data.foto_ktp,
        name: 'Foto KTP',
        type: lookup(data.foto_ktp + ''),
      },
    ],
  };

  const methods = useForm({
    mode: 'onTouched',
    defaultValues: berkasDefaultValues,
  });

  const { reset } = methods;

  //#region  //*=========== Modal ===========
  const closeModal = () => {
    setIsEdit(false);
    reset();
  };
  //#endregion  //*======== Modal ===========
  return (
    <>
      <div className='flex gap-2 justify-end'>
        {/* Edit Button */}
        <Button variant='ghost' onClick={() => setIsEdit(true)}>
          <span className='inline-flex gap-2'>
            <HiOutlineDocumentText size={16} /> <p>Detail Berkas</p>
          </span>
        </Button>
      </div>
      {/* Edit Modal */}
      <Transition.Root show={isEdit} as={React.Fragment}>
        <Dialog
          as='div'
          static
          className='overflow-y-auto fixed inset-0 z-40'
          onClose={setIsEdit}
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
                    onClick={closeModal}
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
                      Detail Berkas
                    </Dialog.Title>
                  </div>
                </div>
                <FormProvider {...methods}>
                  <form className='mt-8 space-y-4'>
                    <DropzoneInput
                      label='Foto Formal'
                      id='foto_formal'
                      accept='image/png, image/jpg, image/jpeg, application/pdf'
                      helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
                      validation={{
                        required: 'Foto Rapor Semester 1 harus diupload',
                      }}
                      readOnly
                    />
                    <DropzoneInput
                      label='Foto KTP'
                      id='foto_ktp'
                      accept='image/png, image/jpg, image/jpeg, application/pdf'
                      helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
                      validation={{
                        required: 'Foto Rapor Semester 1 harus diupload',
                      }}
                      readOnly
                    />
                  </form>
                </FormProvider>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

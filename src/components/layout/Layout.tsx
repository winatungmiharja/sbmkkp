import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

import useDialogStore from '@/store/useDialogStore';

type LayoutProps = { children: React.ReactNode; withDashboardShell?: boolean };

export default function Layout({
  children,
  withDashboardShell = true,
}: LayoutProps) {
  //#region  //*=========== STORE ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== STORE ===========

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (withDashboardShell) {
    return (
      <div className='flex overflow-hidden h-screen bg-white'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='flex flex-col flex-1 mx-auto w-0 max-w-6xl md:px-8 lg:max-w-6xl xl:px-4'>
          <Header setSidebarOpen={setSidebarOpen} />
          <main className='overflow-y-auto relative flex-1 focus:outline-none'>
            <div className='px-4 py-6 sm:px-6 md:px-1'>{children}</div>
          </main>
        </div>
        <BaseDialog
          onClose={handleClose}
          onSubmit={handleSubmit}
          open={open}
          options={state}
        />
      </div>
    );
  } else {
    return (
      <div>
        {children}
        <BaseDialog
          onClose={handleClose}
          onSubmit={handleSubmit}
          open={open}
          options={state}
        />
      </div>
    );
  }
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalNavbar } from './GlobalNavbar';
import { GlobalFooter } from './GlobalFooter';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col pt-[104px]">
      <GlobalNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
};

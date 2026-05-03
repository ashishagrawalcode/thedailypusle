import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-beige font-sans flex flex-col">
      <AdminNavbar />
      
      <main className="flex-1 overflow-x-hidden pt-28 md:pt-36 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

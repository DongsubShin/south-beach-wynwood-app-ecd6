import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <main className="pl-[240px]">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 South Beach Cuts & Wynwood Barbers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
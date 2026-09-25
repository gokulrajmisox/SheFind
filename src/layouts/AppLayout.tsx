import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-primary">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-background-alt border-t border-border py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary">
            © {new Date().getFullYear()} SheFind. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-secondary">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

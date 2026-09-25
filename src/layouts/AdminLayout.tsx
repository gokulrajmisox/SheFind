import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, CheckSquare, Clock, Users, Activity, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminLayout() {
  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Opportunities', path: '/admin/opportunities', icon: FileText },
    { name: 'Pending Verification', path: '/admin/verification', icon: CheckSquare },
    { name: 'Deadlines', path: '/admin/deadlines', icon: Clock },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Activity', path: '/admin/activity', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border">
          <Link to="/" className="text-2xl font-bold text-primary">SheFind Admin</Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-secondary hover:bg-gray-100 hover:text-primary"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-secondary hover:text-accent transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border p-4 md:hidden flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">SheFind Admin</Link>
          <button className="p-2 bg-gray-100 rounded text-secondary">Menu</button>
        </header>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const navLinks = [
    { name: 'Scholarships', path: '/explore?category=scholarships' },
    { name: 'Government Schemes', path: '/explore?category=schemes' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Saved', path: '/saved' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight text-primary">
              SheFind
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-secondary"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-secondary hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center space-x-3 border-l border-border pl-4">
              <Link to="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                Sign In
              </Link>
              <Button size="sm" variant="primary">Create Account</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const navLinks = [
    { name: 'Discover', path: '/explore' },
    { name: 'Guide', path: '/chatbot' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Saved', path: '/saved' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="site-header sticky top-0 z-50 w-full">
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="SheFind home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">SheFind</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={({ isActive }) => cn('nav-link', isActive && 'active')}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="nav-search" aria-label="Search"><Search size={18} strokeWidth={1.8} /></button>
          <Link to="/login" className="nav-signin">Sign in</Link>
          <Button size="sm" className="hidden sm:inline-flex">Join SheFind</Button>
          <button className="mobile-menu" aria-label="Open menu"><Menu size={21} /></button>
        </div>
      </div>
    </header>
  );
}

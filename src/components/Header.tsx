'use client';

import { useState } from 'react';
import Logo from "./Logo";
import { useTheme } from "@/app/theme-provider";
import { SearchSm, Grid03, Bell04, ChevronDown, Sun, Moon02, Menu01, XClose } from '@untitled-ui/icons-react';
import Button from '@/components/Button';

// A simplified NavItem with basic styling
function NavItem({ children, active = false }: { children: React.ReactNode, active?: boolean }) {
  const activeClasses = active ? 'bg-violet-100 dark:bg-violet-800/20 text-violet-700 dark:text-violet-300' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';
  return (
    <a href="#" className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeClasses}`}>
      {children}
    </a>
  );
}

export default function Header() {
  const { setTheme } = useTheme();
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header  style={{ backgroundColor: 'var(--color-surface-main)', borderBottom: '1px solid var(--color-border-moderate)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <div className="desktop-only">
              <nav className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <NavItem>Projects</NavItem>
                  <NavItem active>Jobs</NavItem>
                  <NavItem>Teams</NavItem>
                  <NavItem>Reports</NavItem>
                  <NavItem>Strings</NavItem>
                </div>
              </nav>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Button variant="link-gray" size="sm" style={{ color: 'var(--color-neutral-500)' }}>
                <SearchSm />
              </Button>
              <Button variant="link-gray" size="sm" style={{ color: 'var(--color-neutral-400)' }}>
                <span className="sr-only">Grid</span>
                <Grid03 />
              </Button>
              <Button variant="link-gray" size="sm" style={{ color: 'var(--color-neutral-400)' }}>
                <span className="sr-only">View notifications</span>
                <Bell04 />
              </Button>

              <div className="relative">
                <Button
                  onClick={() => setAccountMenuOpen(!isAccountMenuOpen)}
                  variant="secondary"
                  size="sm"
                  style={{ fontWeight: 'var(--font-weight-heading)' }}
                  className="flex items-center text-sm"
                >
                  Themes
                  <ChevronDown className={`w-5 h-5 ml-1 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                </Button>
                {isAccountMenuOpen && (
                  <div style={{ backgroundColor: 'var(--color-base-white)', boxShadow: 'var(--shadow-m)' }} className="absolute right-0 mt-2 w-60 origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
              
                      <div style={{ borderColor: 'var(--color-neutral-200)' }} className="border-t" />
                      <Button onClick={() => { setTheme('light'); setAccountMenuOpen(false); }} variant="secondary" size="sm" style={{ color: 'var(--color-neutral-700)' }} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                        <Sun className="w-4 h-4 mr-3" /> Light
                      </Button>
                      <Button onClick={() => { setTheme('dark'); setAccountMenuOpen(false); }} variant="secondary" size="sm" style={{ color: 'var(--color-neutral-700)' }} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                        <Moon02 className="w-4 h-4 mr-3" /> Dark
                      </Button>
                      <Button onClick={() => { setTheme('system'); setAccountMenuOpen(false); }} variant="secondary" size="sm" style={{ color: 'var(--color-neutral-700)' }} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                        System
                      </Button>
                      <div style={{ borderColor: 'var(--color-neutral-200)' }} className="border-t" />
                      <Button style={{ color: 'var(--color-neutral-700)' }} variant="secondary" size="sm" className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
                        Log out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mobile-only md:hidden flex items-center">
            <Button
              onClick={() => setMobileMenuOpen(true)}
              variant="secondary"
              size="sm"
              style={{ color: 'var(--color-neutral-400)', backgroundColor: 'var(--color-neutral-700)' }}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu01 className="block h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div style={{ backgroundColor: 'var(--color-base-black)', opacity: 'var(--opacity-soft)', zIndex: 'var(--z-index-tier-8)' }} className="fixed inset-0" onClick={() => setMobileMenuOpen(false)}></div>
          <div style={{ backgroundColor: 'var(--color-base-white)', zIndex: 'var(--z-index-tier-9)' }} className="fixed inset-y-0 right-0 w-full max-w-xs p-4 transform transition-transform ease-in-out duration-300 translate-x-0">
            <div className="flex justify-between items-center mb-4">
                 <h2 style={{ color: 'var(--color-base-black)', fontWeight: 'var(--font-weight-heading)' }} className="text-lg">Menu</h2>
                 <Button style={{ color: 'var(--color-base-black)' }} onClick={() => setMobileMenuOpen(false)}>
                     <XClose />
                 </Button>
            </div>
            <div className="flex flex-col space-y-2">
              <NavItem>Projects</NavItem>
              <NavItem active>Jobs</NavItem>
              <NavItem>Teams</NavItem>
              <NavItem>Reports</NavItem>
              <NavItem>Strings</NavItem>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 

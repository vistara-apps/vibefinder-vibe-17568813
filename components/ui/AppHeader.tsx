'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiMap, FiCompass, FiHeart, FiUser, FiLogIn } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';

export default function AppHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-fluid h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">VibeFinder</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`flex items-center ${isActive('/') ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <FiMap className="mr-1" />
            Map
          </Link>
          <Link 
            href="/discover" 
            className={`flex items-center ${isActive('/discover') ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <FiCompass className="mr-1" />
            Discover
          </Link>
          <Link 
            href="/saved" 
            className={`flex items-center ${isActive('/saved') ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <FiHeart className="mr-1" />
            Saved
          </Link>
          
          {!isLoading && (
            isLoggedIn ? (
              <Link 
                href="/profile" 
                className={`flex items-center ${isActive('/profile') ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <FiUser className="mr-1" />
                Profile
              </Link>
            ) : (
              <Link 
                href="/auth/login" 
                className="btn-primary"
              >
                <FiLogIn className="mr-1" />
                Sign In
              </Link>
            )
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container-fluid py-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`flex items-center ${isActive('/') ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={closeMenu}
            >
              <FiMap className="mr-2" />
              Map
            </Link>
            <Link 
              href="/discover" 
              className={`flex items-center ${isActive('/discover') ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={closeMenu}
            >
              <FiCompass className="mr-2" />
              Discover
            </Link>
            <Link 
              href="/saved" 
              className={`flex items-center ${isActive('/saved') ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={closeMenu}
            >
              <FiHeart className="mr-2" />
              Saved
            </Link>
            
            {!isLoading && (
              isLoggedIn ? (
                <Link 
                  href="/profile" 
                  className={`flex items-center ${isActive('/profile') ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={closeMenu}
                >
                  <FiUser className="mr-2" />
                  Profile
                </Link>
              ) : (
                <Link 
                  href="/auth/login" 
                  className="btn-primary w-full text-center"
                  onClick={closeMenu}
                >
                  <FiLogIn className="mr-2 inline" />
                  Sign In
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}


import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { getCartCount } = useCart();
  
  const isActive = (path) => {
    return router.pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent shadow-none">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            {/* Logo image */}
            <Image 
              src="/images/Bootstrap_logo.svg.png" 
              alt="Store Logo" 
              width={30} 
              height={24} 
              className="me-2"
            />
            <span>MyStore</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${isActive('/') ? 'active-nav-link' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link href="/cart" className={`nav-link position-relative ${isActive('/cart') ? 'active-nav-link' : ''}`}>
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className={`nav-link ${isActive('/about') ? 'active-nav-link' : ''}`}>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {router.pathname === '/' && (
        <div className="mb-4 d-flex justify-content-start">
          <form className="search-form d-flex" onSubmit={handleSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      )}
    </>
  );
}
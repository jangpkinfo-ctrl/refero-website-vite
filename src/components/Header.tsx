'use client'

import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/download', label: 'Download' },  // ✅ No query param
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/support', label: 'Support' },
  ]

  return (
    <header className="container-custom py-6 flex flex-wrap justify-between items-center gap-4">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img 
          src="/logo_with_name.png" 
          alt="Refero" 
          className="h-14 w-auto md:h-16"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </Link>
      
      <nav className="flex flex-wrap items-center gap-4 text-white text-sm md:text-base">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`hover:text-primary-400 transition-colors ${
              location.pathname === link.href ? 'text-primary-400 font-medium' : 'text-white/70'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
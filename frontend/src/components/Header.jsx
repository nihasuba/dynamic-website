import React from 'react'

const Header = ({ title, imageUrl, links }) => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side: Logo and Title */}
        <div className="flex items-center gap-3">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Logo" 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" 
            />
          )}
          <h1 className="text-2xl font-bold text-gray-800">
            {title || "Dashboard Header"}
          </h1>
        </div>

        {/* Right side: Navigation Links */}
        <nav className="flex items-center gap-6">
          {links && links.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              className="text-gray-700 hover:text-blue-600 transition font-medium hover:underline"
            >
              {link.label || `Link ${i + 1}`}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </header>
);

export default Header;

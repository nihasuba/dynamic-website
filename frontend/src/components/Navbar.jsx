import React from 'react'

const Navbar = ({ links }) => (
  <nav className="flex justify-center gap-6 bg-gray-100 p-3">
    {links.map((link, i) => (
      <a key={i} href={link.url} className="text-blue-600 hover:underline">
        {link.label || `Link ${i + 1}`}
      </a>
    ))}
  </nav>
);
export default Navbar;

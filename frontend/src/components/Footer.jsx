import React from 'react'

const Footer = ({ email, phone, address }) => (
  <footer className="bg-gray-800 text-white p-4 space-y-2 flex justify">
    <p>Email: {email || "example@email.com"}</p>
    <p>Phone: {phone || "000-000-0000"}</p>
    <p>Address: {address || "Your address here"}</p>
  </footer>
);
export default Footer;

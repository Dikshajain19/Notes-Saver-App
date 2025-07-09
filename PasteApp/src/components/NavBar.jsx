import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="w-[100vw] bg-[#1e1e1e] shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-[#4ADE80]">
          📝 Notes Saver
        </h1>

        {/* Links */}
        <div className="flex space-x-8 text-lg font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-[#4ADE80] ${
                isActive ? 'text-[#4ADE80]' : 'text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `transition hover:text-[#4ADE80] ${
                isActive ? 'text-[#4ADE80]' : 'text-white'
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

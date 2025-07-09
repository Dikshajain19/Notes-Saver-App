import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex flex-row justify-evenly min-w-[600px] h-[109px]  font-bold text-[#3E7BFA] hover:text-[#3568D4]'>
        <NavLink
        to="/"  className='mt-[18px] mb-[18px] font-extrabold text-[40px] leading-[54px]'>
            Home
        </NavLink>
        <NavLink to="/pastes"   className='mt-[18px] mb-[18px] font-extrabold text-[40px] leading-[54px]'>
            Pastes
        </NavLink>
    </div>
  )
}

export default NavBar
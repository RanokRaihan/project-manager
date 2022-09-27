import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoutIcon from "../../assets/images/logoutIcon.svg";
import personIcon from "../../assets/images/personIcon.svg";
import { userLoggedOut } from "../../features/auth/authSlice";
import { searchProject } from "../../features/filter/filterSlice";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ showSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const isLoggedin = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(userLoggedOut());
  };

  //search function
  const handleSearch = (e) => {
    dispatch(searchProject(e.target.value));
  };

  return (
    <div className='flex items-center flex-shrink-0 w-full h-[4rem] px-10 bg-white bg-opacity-75'>
      <img src={logo} alt='logo' className='h-10 w-10' />

      <div className='ml-10'>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "mx-2 text-sm font-semibold  hover:text-indigo-700 text-indigo-700"
              : "mx-2 text-sm font-semibold  hover:text-indigo-700 text-gray-700"
          }
          to='/projects'
        >
          Projects
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "mx-2 text-sm font-semibold  hover:text-indigo-700 text-indigo-700"
              : "mx-2 text-sm font-semibold  hover:text-indigo-700 text-gray-700"
          }
          to='/teams'
        >
          Team
        </NavLink>
      </div>
      {showSearch && (
        <input
          className='flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring'
          type='search'
          placeholder='Search for Projects...'
          onChange={handleSearch}
        />
      )}
      <div className='ml-auto relative'>
        {isLoggedin && (
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className='flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer'
          >
            <img src={user?.avatar} alt='user' />
          </button>
        )}
        {showMenu && user.name && (
          <div className='absolute animate-popleft right-0 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <ul>
              <li className='px-4 py-2 text-lg flex items-center gap-2 font-bold'>
                <div className='w-8 h-8'>
                  <img src={personIcon} alt='' className='w-full ' />
                </div>

                <span>{user.name}</span>
              </li>
              <li
                onClick={handleLogout}
                className='flex items-center gap-2 block cursor-pointer px-4 py-2 text-md text-slate-600 hover:bg-rose-500 hover:text-white '
              >
                <div className='w-8 h-8'>
                  <img src={logoutIcon} alt='' className='w-full ' />
                </div>
                <button className='text-lg'>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

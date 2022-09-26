import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { userLoggedOut } from "../../features/auth/authSlice";
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

  return (
    <div className='flex items-center flex-shrink-0 w-full h-[4rem] px-10 bg-white bg-opacity-75'>
      <img src={logo} alt='logo' className='h-10 w-10' />
      {showSearch && (
        <input
          className='flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring'
          type='search'
          placeholder='Search for Projects...'
        />
      )}
      <div className='ml-10'>
        <Link className='mx-2 text-sm font-semibold text-indigo-700' to='/projects'>
          Projects
        </Link>
        <Link className='mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700' to='/teams'>
          Team
        </Link>
      </div>
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
          <div className='absolute right-0 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <ul>
              <li className='px-4 py-2 text-lg flex items-center gap-2'>
                <span className='material-symbols-outlined'>person</span>
                <span>{user.name}</span>
              </li>
              <li
                onClick={handleLogout}
                className='flex items-center block cursor-pointer px-4 py-2 text-md text-slate-600 hover:bg-gray-800 hover:text-white '
              >
                <span className='material-symbols-outlined'>logout</span>
                <button className='text-md'>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

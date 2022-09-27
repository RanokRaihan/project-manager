import React from "react";
import { users } from "../../data";

const LoginCredentialsModal = ({ close, setCredentials }) => {
  const handleCredential = ({ email, password }) => {
    setCredentials({ email, password });
    close();
  };
  return (
    <div
      onClick={close}
      className=' overflow-hidden  animate-fadein fixed top-0 cursor-pointer left-0 z-50 w-full h-screen flex bg-neutral-900/[.6] justify-center items-center'
    >
      <div onClick={(e) => e.stopPropagation()} className='relative animate-popup p-4 w-full max-w-lg  '>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-[32rem] overflow-auto'>
          <button
            onClick={close}
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
          >
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='py-6 px-6 lg:px-8'>
            <div className='text-center my-4'>
              <h1 className='text-2xl'>Login Credentials</h1>
              <h3 className='text-md text-neutral-500'>use these Credentials to login</h3>
            </div>
            <table className='w-full'>
              <thead>
                <tr className='text-left'>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className='py-2 border-b border-gray-200 '>{user.email}</td>
                    <td className='py-2 border-b border-gray-200 '>{user.password}</td>
                    <td className='py-2 border-b border-gray-200 '>
                      <button
                        className='bg-indigo-600 text-white px-4 py-2 rounded-md '
                        onClick={() => handleCredential({ email: user.email, password: user.password })}
                      >
                        use
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCredentialsModal;

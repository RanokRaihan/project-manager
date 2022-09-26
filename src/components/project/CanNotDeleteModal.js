import React from "react";

const CanNotDeleteModal = ({ close }) => {
  return (
    <div>
      <div className=' overflow-hidden  fixed top-0  left-0 z-50 w-full h-screen flex bg-neutral-900/[.6] justify-center items-center'>
        <div className='relative p-4 w-full max-w-md  md:h-auto'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
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
              <p className='text-red-600 text-lg'>
                You are not Creator of this Project. Only creator can delete project!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanNotDeleteModal;
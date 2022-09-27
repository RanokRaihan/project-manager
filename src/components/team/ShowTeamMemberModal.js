import React from "react";

const ShowTeamMemberModal = ({ close, team }) => {
  console.log(team);
  return (
    <div
      onClick={close}
      className=' overflow-hidden animate-fadein  fixed top-0  left-0 z-50 w-full h-screen flex bg-neutral-900/[.6] justify-center items-center'
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
          <div className='py-6 px-6 lg:px-8 flex flex-col gap-8'>
            <div className='flex gap-4 items-center'>
              <div className='rounded-full w-24 h-24 overflow-hidden'>
                <img src={team.creator.avatar} alt='creator' />
              </div>
              <div>
                <h1 className='text-2xl font-bold'>{team.creator.name}</h1>
                <p className='text-sm text-neutral-500'>{team.creator.email}</p>
                <h2 className='text-md font-semibold text-neutral-700'>Creator of this team</h2>
              </div>
            </div>
            <div className=''>
              {team.memberDetails.map((member) => (
                <div className={`flex gap-4 items-center p-4 my-4 rounded-md bg-${team.color}-100`}>
                  <div className='rounded-full w-12 h-12 overflow-hidden'>
                    <img src={member.avatar} alt='creator' />
                  </div>
                  <div>
                    <h1 className='text-xl font-bold'>{member.name}</h1>
                    <p className='text-xsm text-neutral-500'>{member.email}</p>
                    <h2 className='text-sm font-semibold text-neutral-700'>Member</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTeamMemberModal;

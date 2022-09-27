import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import checkIcon from "../../assets/images/checkIcon.svg";
import { useAddMemberMutation } from "../../features/teams/teamsApi";
import { useGetUserQuery } from "../../features/users/usersApi";
import isValidEmail from "./../../utilities/isValidEmail";
import ErrorBlock from "./../ui/ErrorBlock";

const AddTeamMemberModal = ({ close, team }) => {
  //local state
  const [allowAddMember, setAllowAddMember] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [fetchUser, setFetchUser] = useState(false);
  const [userError, setUserError] = useState(null);
  const { members, memberDetails, id } = team || {};

  //redux state: auth
  const { email: loggedinEmail } = useSelector((state) => state?.auth?.user) || {};

  // check the user exist or not
  const {
    data: searchedUser,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(emailInput, {
    skip: !fetchUser,
  });

  //update team api
  const [addMember, { isSuccess: isAddMemberSuccess, isError: isAddMemberError, error: addMemberError }] =
    useAddMemberMutation();

  //debounce handler
  const debounceHandler = (fn, delay) => {
    //
    let timeout;

    return (...args) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  //actual search function
  const doSearch = (value) => {
    if (isValidEmail(value)) {
      setEmailInput(value);
      setFetchUser(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (searchedUser.length) {
        const searchedEmail = searchedUser[0]?.email;
        if (searchedEmail && searchedEmail === loggedinEmail) {
          setUserError("you are already in the team");
          setAllowAddMember(false);
        } else if (searchedEmail && members.includes(searchedEmail)) {
          //check serverside later
          setUserError(`${searchedUser[0].name} is already in the team`);
          setAllowAddMember(false);
        } else {
          setUserError(null);
          setAllowAddMember(true);
        }
      } else {
        setUserError("No user found!!");
        setAllowAddMember(false);
      }
    }
  }, [searchedUser, loggedinEmail, members, isSuccess]);
  //search user
  const handleSearchUser = debounceHandler(doSearch, 500);

  const handleAddMember = (e) => {
    e.preventDefault();
    // add team member
    if (allowAddMember) {
      addMember({
        email: loggedinEmail,
        id,
        data: {
          ...team,
          members: `${members}-${searchedUser[0].email}`,
          memberDetails: [...memberDetails, searchedUser[0]],
        },
      });
    }
  };

  //afterwork of add member
  useEffect(() => {
    if (isAddMemberSuccess) {
      close();
    }
  });

  return (
    <div
      onClick={close}
      className=' overflow-hidden  animate-fadein fixed top-0 cursor-pointer left-0 z-50 w-full h-screen flex bg-neutral-900/[.6] justify-center items-center'
    >
      <div onClick={(e) => e.stopPropagation()} className='relative animate-popup p-4 w-full max-w-md  md:h-auto'>
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
            <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Add team member</h3>
            <form className='space-y-6 my-4' onSubmit={handleAddMember}>
              <div className='relative'>
                <label htmlFor='email' className=' sr-only '>
                  User Email
                </label>
                <input
                  id='email'
                  type='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                  placeholder='User Email'
                  required
                  onChange={(e) => handleSearchUser(e.target.value)}
                />
                {allowAddMember && (
                  <img
                    className='absolute top-[50%] translate-y-[-50%] z-20 right-2 w-6'
                    src={checkIcon}
                    alt='check icon'
                  />
                )}
              </div>

              <button
                disabled={!allowAddMember}
                type='submit'
                className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  allowAddMember ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                Add Member
              </button>
            </form>
            {isError && <ErrorBlock message={error?.data || "error"} />}
            {isAddMemberError && <ErrorBlock message={addMemberError.data} />}
            {userError && <ErrorBlock message={userError} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;

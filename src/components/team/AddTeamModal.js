import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateTeamMutation } from "../../features/teams/teamsApi";
import ErrorBlock from "./../ui/ErrorBlock";

const AddTeamModal = ({ close }) => {
  const colors = [
    "zinc",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];
  const [selectedColor, setSelectedColor] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [formError, setFormError] = useState(null);

  //get loggedin user
  const { user } = useSelector((state) => state?.auth);
  const { email: loggedinEmail } = user || {};
  // create team api
  const [createTeam, { isLoading, isError, isSuccess, error }] = useCreateTeamMutation();
  const handleCreateTeam = (e) => {
    e.preventDefault();
    // check all the fielt filled up

    if (teamName.trim() === "") {
      setFormError("team Name is required!");
    } else if (teamDescription.trim() === "") {
      setFormError("team Description is required!");
    } else if (selectedColor === "") {
      setFormError("Please Select a color");
    } else {
      //reset error
      setFormError(null);
      // create team object
      const team = {
        name: teamName,
        description: teamDescription,
        members: user.email,
        memberDetails: [{ user }],
        creator: user,
        color: selectedColor,
        timestamp: new Date().getTime(),
      };
      createTeam({ email: loggedinEmail, data: team });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [close, isSuccess]);

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
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Create a new team</h3>
              <form className='space-y-6 my-4' onSubmit={handleCreateTeam}>
                <div>
                  <label htmlFor='teamName' className=' sr-only '>
                    Team Name
                  </label>
                  <input
                    id='teamName'
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    placeholder='Team Name'
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor='descrioption' className='sr-only'>
                    Team Description
                  </label>
                  <input
                    type='text'
                    id='descrioption'
                    placeholder='Team Description'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor='teamColor' className='mb-4 block'>
                    Assign a color
                  </label>
                  <div id='teamColor' className='flex gap-2 mt-0 flex-wrap'>
                    {colors.map((color) => (
                      <div
                        key={color}
                        className={`w-4 h-4 cursor-pointer bg-${color}-600 ${
                          color === selectedColor && "ring-offset-2 ring-2"
                        }`}
                        onClick={() => setSelectedColor(color)}
                      ></div>
                    ))}
                  </div>
                </div>

                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Create Team
                </button>
              </form>
              {formError && <ErrorBlock message={formError} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamModal;

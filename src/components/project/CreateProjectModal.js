import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateProjectMutation } from "../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import ErrorBlock from "./../ui/ErrorBlock";

const CreateProjectModal = ({ close }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectTeam, setProjectTeam] = useState({
    teamName: "",
    teamId: null,
    teamColor: "",
  });
  const [validationError, setValidationError] = useState(null);

  //get loggedin user
  const user = useSelector((state) => state?.auth?.user);
  const { email: loggedinEmail } = user || {};
  //request for team
  const { data: teams, isSuccess: isTeamQuerySuccess } = useGetTeamsQuery(loggedinEmail);

  // create project api
  const [createProject, { isSuccess: isCreateProjectSuccess, isError }] = useCreateProjectMutation();

  //create new team
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (projectTitle.trim().length === 0) {
      setValidationError("Enter a Project title!");
    } else if (!projectTeam.teamId) {
      setValidationError("Select a Team!");
    } else {
      //create project
      const projectObj = {
        title: projectTitle,
        status: "backlog",
        creator: user,
        teamName: projectTeam.teamName,
        teamId: projectTeam.teamId,
        teamColor: projectTeam.teamColor,
        timestamp: new Date().getTime(),
      };
      const query = teams.map((team) => `&teamId=${team.id}`).join("");
      createProject({ query, data: projectObj });
    }
  };

  // afterwork of create project
  useEffect(() => {
    if (isCreateProjectSuccess) {
      close();
    }
  }, [close, isCreateProjectSuccess]);
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
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Create a new project</h3>
              <form className='space-y-6 my-4' onSubmit={handleCreateProject}>
                <div>
                  <label htmlFor='projectTitle' className=' sr-only '>
                    Project Title
                  </label>
                  <input
                    id='projectTitle'
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    placeholder='Project Title'
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor='projectTeam' className='mb-4 block'>
                    Select a team
                  </label>
                  <div id='projectTeam' className='flex gap-2 mt-0 flex-wrap'>
                    {isTeamQuerySuccess ? (
                      teams.map((team) => (
                        <span
                          key={team.id}
                          onClick={() =>
                            setProjectTeam({ teamName: team.name, teamId: team.id, teamColor: team.color })
                          }
                          className={`flex cursor-pointer items-center h-6 px-3 text-xs font-semibold text-${
                            team.color
                          }-500 bg-${team.color}-100 rounded-full ${
                            projectTeam.teamId === team.id && "ring-offset-2 ring-2"
                          }`}
                        >
                          {team.name}
                        </span>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>

                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Create Team
                </button>
              </form>
              {validationError && <ErrorBlock message={validationError} />}
              {isError && <ErrorBlock message={`Creating Project failed!`} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;

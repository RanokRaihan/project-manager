import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDeleteProjectMutation } from "../../features/projects/projectsApi";
import CanNotDeleteModal from "./CanNotDeleteModal";

const Project = ({ project, index, menuId, setMenuId, queryString }) => {
  //local state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { id, title, teamName, timestamp, teamColor, status, creator } = project || {};

  //close modal function
  const close = () => {
    setShowDeleteModal(false);
  };
  //get loggedinuser
  const { email: loggedinEmail } = useSelector((state) => state?.auth?.user) || {};

  //delete api
  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = (id) => {
    // check the user is creator
    console.log(loggedinEmail);
    console.log(creator);

    if (loggedinEmail === creator.email) {
      deleteProject({ queryString, id });
      setMenuId(null);
    } else {
      setShowDeleteModal(true);
      setMenuId(null);
    }
  };
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100'
          draggable='true'
        >
          {status === "backlog" && (
            <button
              onClick={() => setMenuId((prev) => (prev === id ? null : id))}
              className='absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex'
            >
              <svg
                className='w-4 h-4 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
              </svg>
            </button>
          )}
          {menuId && menuId === id && (
            <div
              className={`absolute right-0 mr-2 top-8 z-50 mt-2  origin-top-right overflow-hidden rounded-md bg-red-500 text-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <ul>
                <li>
                  <button
                    onClick={() => handleDelete(id)}
                    className={`px-4 py-2 block w-full text-sm flex items-center gap-2 hover:bg-red-600 hover:text-white transition-colors`}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}

          {showDeleteModal && <CanNotDeleteModal close={close} />}
          <span
            className={`flex items-center h-6 px-3 text-xs font-semibold text-${teamColor}-500 bg-${teamColor}-100 rounded-full capitalize`}
          >
            {teamName}
          </span>
          <h4 className='mt-3 text-sm font-medium'>{title}</h4>
          <div className='flex items-center w-full mt-3 text-xs font-medium text-gray-400'>
            <div className='flex items-center'>
              <svg
                className='w-4 h-4 text-gray-300 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='ml-1 leading-none'>{new Date(timestamp).toDateString()}</span>
            </div>

            <img alt='avatar' className='w-6 h-6 ml-auto rounded-full' src={creator.avatar} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Project;

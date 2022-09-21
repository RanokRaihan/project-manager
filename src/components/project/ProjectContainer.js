import React from "react";
import ProjectCategory from "./ProjectCategory";

const ProjectContainer = () => {
  return (
    <div className='flex flex-grow px-10 mt-4 space-x-6 overflow-auto'>
      <ProjectCategory category='backlog' />
      <ProjectCategory category='ready' />
      <ProjectCategory category='doing' />
      <ProjectCategory category='review' />
      <ProjectCategory category='blocked' />
      <ProjectCategory category='done' />
    </div>
  );
};

export default ProjectContainer;

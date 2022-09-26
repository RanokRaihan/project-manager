import React, { useState } from "react";

import CategoryContainer from "./CategoryContainer";
import CategoryHeader from "./CategoryHeader";
import Project from "./Project";

const ProjectCategory = ({ category, projects, ...rest }) => {
  const [menuId, setMenuId] = useState(null);
  return (
    <div className='flex flex-col flex-shrink-0 w-56 mb-4'>
      <CategoryHeader category={category} totalProject={projects.length} />

      <CategoryContainer category={category}>
        {projects
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((project, index) => (
            <Project
              q
              project={project}
              key={project.id}
              index={index}
              menuId={menuId}
              setMenuId={setMenuId}
              {...rest}
            />
          ))}
      </CategoryContainer>
    </div>
  );
};

export default ProjectCategory;

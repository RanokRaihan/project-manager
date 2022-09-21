import React from "react";
import CategoryContainer from "./CategoryContainer";
import CategoryHeader from "./CategoryHeader";
import Project from "./Project";

const ProjectCategory = ({ category }) => {
  return (
    <div className='flex flex-col flex-shrink-0 w-72'>
      <CategoryHeader category={category} />
      <CategoryContainer>
        <Project />
        <Project />
        <Project />
        <Project />
      </CategoryContainer>
    </div>
  );
};

export default ProjectCategory;

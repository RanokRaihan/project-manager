import React from "react";
import ProjectContainer from "../project/ProjectContainer";
import ProjectHeader from "../project/ProjectHeader";
import Navbar from "./../nav/Navbar";

const Projects = () => {
  // get teams of loggedin user
  return (
    <>
      <Navbar showSearch={true} />
      <ProjectHeader />
      <ProjectContainer />
    </>
  );
};

export default Projects;

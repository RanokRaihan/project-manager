import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useGetProjectsQuery, useUpdateProjectMutation } from "../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import ProjectCategory from "./ProjectCategory";

const ProjectContainer = () => {
  //local states
  const [queryString, setQueryString] = useState("");
  const [requestProjects, setRequestProjects] = useState(false);

  //get loggedin user
  const user = useSelector((state) => state?.auth?.user);
  const { email: loggedinEmail } = user || {};

  //request for team
  const { data: teams, isSuccess: isTeamQuerySuccess } = useGetTeamsQuery(loggedinEmail);

  //request for projects
  const { data: projects, isSuccess: isProjectQuerySuccess } = useGetProjectsQuery(queryString, {
    skip: !requestProjects,
  });

  //update project api
  const [updateProject] = useUpdateProjectMutation();

  //request for projects after teams query
  useEffect(() => {
    if (isTeamQuerySuccess) {
      const query = teams.map((team) => `&teamId=${team.id}`).join("");
      setQueryString(query);
      setRequestProjects(true);
    }
  }, [isTeamQuerySuccess, teams]);

  //filter Projects
  const filterProject = (projects = [], category) => {
    return projects.filter((project) => project.status === category);
  };

  //after drag end update project state
  const onDragEnd = (result) => {
    if (!result.destination || result.destination.droppableId === result.source.droppableId) return;
    console.log(result);
    const toUpdataProject = projects.filter((project) => project.id.toString() === result.draggableId)[0];

    if (toUpdataProject) {
      const updatedProject = { ...toUpdataProject, status: result.destination.droppableId };
      updateProject({ queryString, id: result.draggableId, data: updatedProject });
    }
  };
  return isProjectQuerySuccess ? (
    <div className='project-container flex flex-grow w-full h-[calc(100vh-150rem)] px-10 mt-4 space-x-6 '>
      <DragDropContext onDragEnd={onDragEnd}>
        <ProjectCategory
          queryString={queryString}
          key='backlog'
          category='backlog'
          projects={filterProject(projects, "backlog")}
        />
        <ProjectCategory
          queryString={queryString}
          key='ready'
          category='ready'
          projects={filterProject(projects, "ready")}
        />
        <ProjectCategory
          queryString={queryString}
          key='doing'
          category='doing'
          projects={filterProject(projects, "doing")}
        />
        <ProjectCategory
          queryString={queryString}
          key='review'
          category='review'
          projects={filterProject(projects, "review")}
        />
        <ProjectCategory
          queryString={queryString}
          key='blocked'
          category='blocked'
          projects={filterProject(projects, "blocked")}
        />
        <ProjectCategory
          queryString={queryString}
          key='done'
          category='done'
          projects={filterProject(projects, "done")}
        />
      </DragDropContext>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProjectContainer;

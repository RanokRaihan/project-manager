import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import ErrorBlock from "../ui/ErrorBlock";
import Team from "./Team";

const TeamContainer = () => {
  const { user } = useSelector((state) => state?.auth);
  const { email } = user || {};
  const { data: teams, isLoading, isError, isSuccess } = useGetTeamsQuery(email);

  const [menuId, setMenuId] = useState(null);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <ErrorBlock message='error occured!!' />;
  } else if (isSuccess && teams.length === 0) {
    content = <p>No teams found</p>;
  } else if (isSuccess && teams.length > 0) {
    content = teams.map((team) => <Team key={team.id} team={team} menuId={menuId} setMenuId={setMenuId} />);
  }

  return <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto'>{content}</div>;
};

export default TeamContainer;

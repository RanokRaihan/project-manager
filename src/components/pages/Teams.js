import React, { useState } from "react";
import Navbar from "../nav/Navbar";
import AddTeamModal from "../team/AddTeamModal";
import TeamContainer from "../team/TeamContainer";
import TeamHeader from "../team/TeamHeader";

const Teams = () => {
  const [showModal, setShowModal] = useState(false);
  const open = () => {
    setShowModal(true);
  };
  const close = () => {
    setShowModal(false);
  };
  return (
    <>
      <Navbar showSearch={false} />
      <TeamHeader open={open} />
      <TeamContainer />
      {showModal && <AddTeamModal close={close} />}
    </>
  );
};

export default Teams;

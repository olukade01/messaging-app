import React from "react";
import { AddChannel } from "../assets/AddChannel";

const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setIsEditing,
  setCreateType,
  setToggleContainer,
}) => {
  if (error) {
    return type === "team" ? (
      <div>
        <p>Connection error, please wait a moment and try again.</p>
      </div>
    ) : null;
  }
  if (loading) {
    return (
      <div>
        <p>{type === "team" ? "Channels" : "Messages"} loading...</p>
      </div>
    );
  }
  return (
    <div>
      <div>
        <p>{type === "team" ? "Channels" : "Direct Messages"}</p>
        <AddChannel
          type={type === "team" ? "team" : "messaging"}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;

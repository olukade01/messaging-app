import { UserAddIcon } from "@heroicons/react/outline";
import React from "react";

const TeamChannelList = ({ children, error = false, loading, type }) => {
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
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;

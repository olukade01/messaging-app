import React from "react";
import { Channel, useChatContext } from "stream-chat-react";
import { CreateChannel, EditChannel, ChannelInner, TeamMessage } from "../";

const ChannelContainer = ({
  isCreating,
  isEditing,
  setIsCreating,
  setIsEditing,
  createType,
}) => {
  const { channel } = useChatContext();

  if (isCreating) {
    return;
  }

  if (isEditing) {
    return;
  }
  return <div>ChannelContainer</div>;
};

export default ChannelContainer;

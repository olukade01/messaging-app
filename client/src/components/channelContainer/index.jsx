import React from "react";
import { Channel, useChatContext, MessageTeam } from "stream-chat-react";
import { CreateChannel, EditChannel, ChannelInner } from "../";

const ChannelContainer = ({
  isCreating,
  isEditing,
  setIsCreating,
  setIsEditing,
  createType,
}) => {
  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div>
      <p>This is the beginning of your chat history</p>
      <p>Send messages, attachments, links, emojis, and more!</p>
    </div>
  );

  return (
    <div>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;

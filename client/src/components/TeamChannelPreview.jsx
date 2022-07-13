import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();
  const ChannelPreview = () => (
    <p> # {channel?.data?.name || channel?.data?.id}</p>
  );
  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div>
        <Avatar image={members[0].user.image} />
      </div>
    );
  };

  return <div></div>;
};

export default TeamChannelPreview;

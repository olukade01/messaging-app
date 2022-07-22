import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { CloseCreateChannel } from "../assets/CloseCreateChannel";
import { UserList } from "./";
import { ChannelNameInput } from "./CreateChannel";

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const updateChannel = async (e) => {
    e.preventDefault();
    const nameChanged = channelName !== (channel.data.name || channel.data.id);
    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }
    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }
    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  };
  return (
    <div>
      <div>
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;

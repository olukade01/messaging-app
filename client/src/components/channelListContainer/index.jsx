import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import {
  SideBar,
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from "../";
import { useState } from "react";

const Wrapper = styled.div`
  background-color: antiquewhite;
  flex-direction: column;
  height: 100vh;
  width: 23%;
  padding: 0 20px 0;
`;

const cookies = new Cookies();

const channelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};
const channelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setIsEditing,
  setCreateType,
  setToggleContainer,
}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("fullName");
    cookies.remove("hashedPassword");
    cookies.remove("username");
    cookies.remove("phoneNumber");
    cookies.remove("avatarURL");

    window.location.reload();
  };
  const filters = { members: { $in: [client.userID] } };
  return (
    <div>
      <SideBar logout={logout} />
      <ChannelSearch setToggleContainer={setToggleContainer} />
      <ChannelList
        filters={filters}
        channelRenderFilterFn={channelTeamFilter}
        List={(listProps) => (
          <TeamChannelList
            {...listProps}
            type="team"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
            setToggleContainer={setToggleContainer}
          />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview
            {...previewProps}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
            type="team"
          />
        )}
      />
      <ChannelList
        filters={filters}
        channelRenderFilterFn={channelMessagingFilter}
        List={(listProps) => (
          <TeamChannelList
            {...listProps}
            type="messaging"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
            setToggleContainer={setToggleContainer}
          />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview
            {...previewProps}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
            type="messaging"
          />
        )}
      />
    </div>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <Wrapper>
      <div>
        <ChannelListContent
          setCreateType={setCreateType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
        />
      </div>
      {/* <div
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          setCreateType={setCreateType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div> */}
    </Wrapper>
  );
};

export default ChannelListContainer;

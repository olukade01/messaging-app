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
  width: 25%;
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
}) => {
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
  return (
    <Wrapper>
      <SideBar logout={logout} />
      <ChannelSearch />
      <ChannelList
        filters={{}}
        channelRenderFilterFn={channelTeamFilter}
        List={(listProps) => (
          <TeamChannelList
            {...listProps}
            type="team"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
          />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview {...previewProps} type="team" />
        )}
      />
      <ChannelList
        filters={{}}
        channelRenderFilterFn={channelMessagingFilter}
        List={(listProps) => (
          <TeamChannelList
            {...listProps}
            type="messaging"
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
          />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview {...previewProps} type="messaging" />
        )}
      />
    </Wrapper>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <div>
        <ChannelListContent
          setCreateType={setCreateType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
        />
      </div>
      <div
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      ></div>
    </>
  );
};

export default ChannelListContainer;

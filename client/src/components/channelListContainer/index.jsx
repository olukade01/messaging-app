import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import {
  SideBar,
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from "../";

const Wrapper = styled.div`
  background-color: antiquewhite;
  flex-direction: column;
  height: 100vh;
  width: 25%;
  padding: 0 20px 0;
`;

const cookies = new Cookies();

const ChannelListContainer = () => {
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
        channelRenderFilterFn={() => {}}
        List={(listProps) => <TeamChannelList {...listProps} type="team" />}
        Preview={(previewProps) => (
          <TeamChannelPreview {...previewProps} type="team" />
        )}
      />
      <ChannelList
        filters={{}}
        channelRenderFilterFn={() => {}}
        List={(listProps) => (
          <TeamChannelList {...listProps} type="messaging" />
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview {...previewProps} type="messaging" />
        )}
      />
    </Wrapper>
  );
};

export default ChannelListContainer;

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer, Auth } from "./components";

const Wrapper = styled.div`
  display: flex;
`;

const apiKey = "q9r9sz27vd6q";
const client = StreamChat.getInstance(apiKey);
const authToken = false;

function App() {
  if (!authToken) return <Auth />;
  return (
    <Wrapper>
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </Wrapper>
  );
}

export default App;

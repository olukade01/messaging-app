import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer } from "./components";

const apiKey = "q9r9sz27vd6q";
const client = StreamChat.getInstance(apiKey);

const Wrapper = styled.div`
  display: flex;
`;

function App() {
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

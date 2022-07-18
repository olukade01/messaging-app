import { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer, Auth } from "./components";

import "stream-chat-react/dist/css/index.css";

const Wrapper = styled.div`
  display: flex;
`;

const cookies = new Cookies();
const apiKey = "q9r9sz27vd6q";
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      fullName: cookies.get("fullName"),
      hashedPassword: cookies.get("hashedPassword"),
      name: cookies.get("username"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarURL"),
    },
    authToken
  );
}

function App() {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;
  return (
    <Wrapper>
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          createType={createType}
          isEditing={isEditing}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
        />
      </Chat>
    </Wrapper>
  );
}

export default App;

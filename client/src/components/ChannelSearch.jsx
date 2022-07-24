import { SearchIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";
import styled from "styled-components";
import { ResultsDropdown } from "./";

const SearchWrapper = styled.div`
  width: 92%;
  background-color: lightgrey;
  height: 40px;
  border-radius: 10px;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  padding: 0 10px 0 10px;

  :hover {
    border: 2px solid white;
  }
`;

const ChannelSearch = ({ setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const getChannel = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });
      const userResponse = client.queryUsers({
        name: { $autocomplete: text },
        id: { $ne: client.userID },
      });
      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);
      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery("");
    }
  };
  const onSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(e.target.value);
    getChannel(e.target.value);
  };

  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  return (
    <>
      <SearchWrapper>
        <SearchIcon width={25} />
        <input
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            height: "100%",
            marginLeft: 10,
            fontSize: 20,
            width: "100%",
            // color: "#fff",
          }}
          onChange={onSearch}
          value={query}
          type="text"
          placeholder="Search"
        />
      </SearchWrapper>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </>
  );
};

export default ChannelSearch;

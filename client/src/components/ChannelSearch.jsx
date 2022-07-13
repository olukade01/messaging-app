import { SearchIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { getChannel, useChatContext } from "stream-chat-react";
import styled from "styled-components";

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

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannel = async (text) => {
    try {
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

  return (
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
  );
};

export default ChannelSearch;

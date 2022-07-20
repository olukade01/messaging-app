import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import styled from "styled-components";
import { InviteIcon } from "../assets/InviteIcon";

const EmptyCheck = styled.div`
  width: 26px;
  height: 26px;
  border: 1px solid gray;
  border-radius: 50%;
`;

const ListContainer = ({ children }) => {
  return (
    <div>
      <div>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);
  const handleSelected = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }
    setSelected((prevSelected) => !prevSelected);
  };
  return (
    <div onClick={handleSelected}>
      <div>
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p>{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <EmptyCheck />}
    </div>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);
  const { client } = useChatContext();

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );
        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div>Error loading, please refresh and try again</div>
      </ListContainer>
    );
  }
  if (listEmpty) {
    return (
      <ListContainer>
        <div>No users found.</div>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      {loading ? (
        <div>Loading users...</div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;

import styled from "styled-components";

import { LogoutIcon } from "@heroicons/react/outline";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SideBar = ({ logout }) => (
  <Wrapper>
    <LogoWrapper>
      <LogoutIcon style={{ width: 50 }} />
      <h2>Chat App</h2>
    </LogoWrapper>
    <LogoutIcon onClick={logout} style={{ width: 50 }} />
  </Wrapper>
);

export default SideBar;

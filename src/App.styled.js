import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: inherit;
  &.active {
    color: red;
  }
  &:hover {
    text-decoration: underline;
    color: red;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  padding: 20px 50px;
  gap: 40px;
  font-size: 50px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  box-shadow: 0px 0px 7px 0px grey;
`;

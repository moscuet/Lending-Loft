import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const StyledNavLink = styled(NavLink)`
  color: var(--navbar-text-color); /* Match the default text color with the design theme */
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;

  &:hover {
    color: var(--link-hover-color);
  }

  &:focus {
    outline: none;
  }

  &.active {
    color: var(--active-color);
    background-color: var(--navbar-bg-color);
  }
`; 

export default StyledNavLink;
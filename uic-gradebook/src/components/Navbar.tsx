import { NavLink, useMatch } from "react-router-dom";
import { flexRow, stickyFooter } from "../styles/styles";
import {
  HomeIcon,
  HomeFillIcon,
  PersonIcon,
  PersonFillIcon
} from "@primer/octicons-react";
import { BiSearchAlt, BiSearch, BiSolidGroup, BiGroup } from "react-icons/bi";

// contains all the icons to deal with navigation, the route must be used properly

function Navbar() {
  return (
    <>
      <div style={{ ...flexRow, ...stickyFooter }}>
        <NavLink to="/friends">
          {useMatch("/friends") ? (
            <BiSolidGroup size={32} />
          ) : (
            <BiGroup size={32} />
          )}
        </NavLink>
        <NavLink to="/">
          {useMatch("/") ? <HomeFillIcon size={32} /> : <HomeIcon size={32} />}
        </NavLink>
        <NavLink to="/searchcourse">
        {useMatch("/searchcourse") ? (
            <BiSearchAlt size={32} />
        ) : (
            <BiSearch size={32} />
          )}
        </NavLink>
        <NavLink to="/profile">
          {useMatch("/profile") ? (
            <PersonFillIcon size={32} />
          ) : (
            <PersonIcon size={32} />
          )}
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;

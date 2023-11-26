import { NavLink, useMatch } from "react-router-dom";
import { flexRow, stickyFooter } from "../styles/styles";
import {
  HomeIcon,
  HomeFillIcon,
  PersonIcon,
  PersonFillIcon,
} from "@primer/octicons-react";
import { BiSearchAlt, BiSearch, BiSolidGroup, BiGroup } from "react-icons/bi";

// contains all the icons to deal with navigation, the route must be used properly

function Navbar() {
  const matchFriends = useMatch("/friends");
  const matchProfile = useMatch("/friends/profile/:name/:surname/:id");
  return (
    <>
      <div style={{ ...flexRow, ...stickyFooter }}>
        <NavLink to="/friends">
          {(matchFriends || matchProfile) ? (
            <BiSolidGroup size={32} color="white" />
          ) : (
            <BiGroup size={32} color="white" />
          )}
        </NavLink>
        <NavLink to="/">
          <div style={{ color: "white" }}>
            {useMatch("/") ? (
              <HomeFillIcon size={32} />
            ) : (
              <HomeIcon size={32} />
            )}
          </div>
        </NavLink>
        <NavLink to="/searchcourse">
          {useMatch("/searchcourse") ? (
            <BiSearchAlt size={32} color="white" />
          ) : (
            <BiSearch size={32} color="white" />
          )}
        </NavLink>
        <NavLink to="/profile">
          <div style={{ color: "white" }}>
            {useMatch("/profile") ? (
              <PersonFillIcon size={32} />
            ) : (
              <PersonIcon size={32} />
            )}
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;

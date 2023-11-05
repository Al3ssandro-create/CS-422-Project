import { NavLink } from "react-router-dom";
import { flexRow } from "../styles/styles";
import { FriendsIcon } from "../icons/FriendsIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { UserIcon } from "../icons/UserIcon";

// contains all the icons to deal with navigation, the route must be used properly

function Navbar() {
  return (
    <>
      <div style={flexRow}>
        <NavLink to="/friends">
          <FriendsIcon />
        </NavLink>
        <NavLink to="/">
          <HomeIcon />
        </NavLink>
        <NavLink to="/searchcourse">
          <SearchIcon />
        </NavLink>
        <NavLink to="/profile">
          <UserIcon />
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;

import { Navbar, NavbarContent } from "@nextui-org/react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/css/header.css";
import styled from "styled-components";
export default function Header() {
  const location = useLocation();
  const StyledNavBar = styled(Navbar)`
    background-color: #9e2d32;
    min-height: 10vh;
    width: 100%;`
  ;

  const navigate = useNavigate();
  return (
    <StyledNavBar>
      <div
        style={{
          backgroundImage: 'url("/src/icons/logo.svg")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%", // You need to specify a height for the background image to show
          width: "100%", // And a width as well
        }}
      >
        <NavbarContent>
          {location.pathname !== "/" && (
              <div onClick={() => navigate(-1)}>
                <FaAngleLeft color="white" />   
              </div>
            )}
        </NavbarContent>
      </div>
    </StyledNavBar>
  );
}


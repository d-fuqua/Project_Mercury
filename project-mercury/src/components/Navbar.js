import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
  LogoText,
} from "../styles/Navbar.style";
import LogoImg from "../assets/logo.png";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/"> Dashboard</NavbarLink>
            <NavbarLink to="/portfolio"> Portfolio</NavbarLink>
            <NavbarLink to="/transactions"> Transactions</NavbarLink>
            <NavbarLink to="/investments"> Investments</NavbarLink>
            <NavbarLink to="/regular_expenses"> Regular Expenses</NavbarLink>
            <NavbarLink to="/budgets"> Budgets</NavbarLink>
            <NavbarLink to="/income"> Income</NavbarLink>
            <NavbarLink to="/loans"> Loans</NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src={LogoImg}></Logo>
          <LogoText> Mercury </LogoText>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/"> Dashboard</NavbarLinkExtended>
          <NavbarLinkExtended to="/portfolio"> Portfolio</NavbarLinkExtended>
          <NavbarLinkExtended to="/transactions"> Transactions</NavbarLinkExtended>
          <NavbarLinkExtended to="/investments"> Investments</NavbarLinkExtended>
          <NavbarLinkExtended to="/regular_expenses"> Regular Expenses</NavbarLinkExtended>
          <NavbarLinkExtended to="/budget"> Budgets</NavbarLinkExtended>
          <NavbarLinkExtended to="/income"> Income</NavbarLinkExtended>
          <NavbarLinkExtended to="/loans"> Loans</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
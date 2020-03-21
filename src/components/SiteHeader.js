import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <Navbar
      dark
      color="dark"
      className="navbar-expand-sm py-0 page-header"
    >
      <NavbarBrand href="/" className="mr-auto font-xxl">
        Restaurants and Bars
      </NavbarBrand>
      <NavbarToggler onClick={toggleIsOpen} className="mr-2" />
      <Collapse
        navbar
        isOpen={!isOpen}
        className="align-self-end font-lg"
      >
        <Nav navbar className="flex-row justify-content-around ml-auto">
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/map">Map</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

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
      className="py-0 border-bottom border-warning page-header"
    >
      <NavbarBrand tag={Link} to="/retail-info" className="mr-auto font-xxl">
        Restaurants and Bars
      </NavbarBrand>

      <Nav navbar className="flex-row justify-content-around ml-auto font-xl">
        <NavItem className="mx-3">
          <NavLink tag={Link} to="/retail-info">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/map">Map</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

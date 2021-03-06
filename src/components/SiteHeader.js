import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { AddBusinessModal, InfoModal } from './';

export default function SiteHeader() {
  const [isInfoModalShown, setIsInfoModalShown] = useState(false);
  const [infoModal, setInfoModal] = useState({ title: 'test title', message: 'test message' });

  const handleShowInfoModal = (title, message, isSuccess) => {
    setInfoModal({
      title,
      message,
      headerClassName: isSuccess ? 'text-success' : 'text-danger'
    });
    setIsInfoModalShown(true);
  }

  return (
    <Navbar
      dark
      color="dark"
      style={{ top: 0, zIndex: 999 }}
      className="position-fixed w-100 py-0 border-bottom border-warning page-header shadow"
    >
      <NavbarBrand tag={Link} to="/retail-info" className="mr-auto text-extra-light font-xxl">
        Local Food
      </NavbarBrand>

      <Nav navbar className="flex-row justify-content-around align-items-center ml-auto font-xl">
        <NavItem>
          <AddBusinessModal handleShowInfoModal={handleShowInfoModal} />
        </NavItem>
        <NavItem className="mx-3">
          <NavLink
            tag={Link}
            to="/retail-info"
            className="text-extra-light"
          >
            Home
          </NavLink>
        </NavItem>
        <NavItem>
        <a
          target="_blank"
          href="https://www.buymeacoffee.com/P8xFVtj"
          className="d-inline-flex align-items-center rounded-circle coffee-button"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
            className="mx-auto"
          />
          {/* <span
            style={{ fontSize: '28px !important'}}
            className="mx-3"
          >
            Buy me a coffee
          </span> */}
        </a>
        </NavItem>
      </Nav>

      {isInfoModalShown && (
        <InfoModal {...infoModal} />
      )}
    </Navbar>
  );
}

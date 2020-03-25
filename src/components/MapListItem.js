import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Collapse, ListGroupItem } from 'reactstrap';
import {
  faCheck, faTimes, faAngleDown, faAngleLeft,
  faMapMarkerAlt, faPhoneAlt, faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Services } from './';

const menuData = require('../data/menus.json');

export default function MapListItem({
  business, isSelected, handleItemOnClick,
  handleItemOnDoubleClick, handleAddressClick
}) {
  const [isCollapseOpen, setIsOpen] = useState(isSelected);

  const toggleIsCollapseOpen = (event) => {
    event.stopPropagation();
    setIsOpen(!isCollapseOpen);
  }

  return (
    <ListGroupItem
      key={business.name}
      onClick={event => {
        toggleIsCollapseOpen(event);
        handleItemOnClick(business);
      }}
      onDoubleClick={() => handleItemOnDoubleClick(business.menuId)}
      className="py-2 rounded-0 cursor-pointer bg-dark text-extra-light"
    >
      <div className="d-flex justify-content-between align-items-center ">
        <span className="flex-fill pr-4 font-weight-bold text-capitalize text-truncate">
          {business.name}
        </span>

        <div className="d-flex mx-2">
          {menuData.hasOwnProperty(business.menuId) && (
            <div>
              <FontAwesomeIcon
                fixedWidth
                icon={faUtensils}
                className="mx-1 text-success"
              />
            </div>
          )}
          <div>
            <a
              href={`tel:${business.phone}`}
              target="_blank"
              className="mx-1 font-sm"
            >
              <FontAwesomeIcon
                fixedWidth
                icon={faPhoneAlt}
                className="text-info"
              />
            </a>
          </div>
          <div>
            <Link
              to="#"
              onClick={() => handleAddressClick(business.name, business.address)}
              className="mx-1 font-sm"
            >
              <FontAwesomeIcon
                fixedWidth
                icon={faMapMarkerAlt}
                className="text-info"
              />
            </Link>
          </div>
        </div>

        <Button
          outline
          color="link"
          onClick={toggleIsCollapseOpen}
          className="p-0 text-extra-light outline-none"
        >
          <FontAwesomeIcon
            fixedWidth
            size="lg"
            icon={isCollapseOpen ? faAngleDown : faAngleLeft}
          />
        </Button>
      </div>

      <Collapse
        isOpen={isCollapseOpen}
        className="pt-2"
      >
        <div className="d-flex justify-content-around align-items-center flex-wrap">
          <div className="flex-fill pr-4">
            <Services
              services={business.services}
              businessName={business.name}
              fontSize="font-xs"
            />
          </div>

          <div className="d-flex justify-content-around align-items-center">
            {menuData.hasOwnProperty(business.menuId) && (
              <div className="d-flex flex-column font-weight-bold font-xs text-center text-success">
                <span>
                  Menu
                </span>
                <span>
                  Available
                </span>
              </div>
            )}

            <Link
              to={`/retail-info/businesses/${business.menuId}`}
              className="btn btn-outline-success btn-sm px-2 mx-2"
            >
              More Info
            </Link>
          </div>
        </div>
      </Collapse>
    </ListGroupItem>
  );
}

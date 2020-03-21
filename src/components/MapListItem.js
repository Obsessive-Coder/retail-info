import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Collapse, ListGroupItem } from 'reactstrap';
import {
  faCheck, faTimes, faAngleDown, faAngleLeft,
  faMapMarkerAlt, faPhoneAlt, faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CONSTANTS } from '../utils';

const { BOOLEAN_FIELDS } = CONSTANTS;
const menuData = require('../data/menus.json');

export default function MapListItem({
  business, isSelected, handleItemOnClick, handleAddressClick
}) {
  const [isCollapseOpen, setIsOpen] = useState(isSelected);

  const toggleIsCollapseOpen = (event) => {
    event.stopPropagation();
    setIsOpen(!isCollapseOpen);
  }

  return (
    <ListGroupItem
      key={business.name}
      onClick={() => handleItemOnClick(business)}
      className="py-2 rounded-0 cursor-pointer bg-dark text-secondary"
    >
      <div className="d-flex justify-content-between align-items-center ">
        <span className="flex-fill font-weight-bold">
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
          <div className="text-truncate">
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
          className="p-0 text-secondary outline-none"
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
        className="pt-2 text-center"
      >
        <div className="d-flex text-secondary">
          {BOOLEAN_FIELDS.map(({ propertyName, labelText }) => (
            <div
              key={`${business.name}-${propertyName}`}
              className="d-flex flex-column align-items-center flex-fill mx-1 text-center"
            >
              <FontAwesomeIcon
                fixedWidth
                // size="2x"
                icon={business[propertyName] ? faCheck : faTimes}
                className={business[propertyName] ? 'text-success' : 'text-danger'}
              />
              <span className="font-weight-bold font-xs">
                {labelText}
              </span>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-around align-items-center mt-3">
          {menuData.hasOwnProperty(business.menuId) && (
            <div className="d-flex flex-column font-weight-bold font-xs text-success">
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
            className="btn btn-outline-success btn-sm px-4"
          >
            More Info
          </Link>
        </div>
      </Collapse>
    </ListGroupItem>
  );
}

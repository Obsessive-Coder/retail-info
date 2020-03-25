import React from 'react';
import { Button } from 'reactstrap';
import {
  faMapMarkerAlt, faPhoneAlt, faClock, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Services, BusinessHoursCollapse } from './';

const menuData = require('../data/menus.json');

export default function MapInfo({
  business, handleGoToOnClick, handleAddressClick,
  handleCloseOnClick,
}) {
  const {
    name,
    address,
    city,
    phone,
    specialHours,
    regularHours,
    services,
    menuId,
  } = business;

  return (
    <div id="test-div">
      <div className="position-relative mb-1">
        <h6 className="mx-4 text-center text-extra-light font-weight-bold text-truncate">
          {name}
        </h6>
        <Button
          close
          size="sm"
          onClick={handleCloseOnClick}
          style={{ top: '-5px', right: 0 }}
          className="position-absolute text-danger outline-none"
        >
          <FontAwesomeIcon icon={faTimes} size="xs" />
        </Button>
      </div>
      <div className="d-flex align-items-center font-weight-bold">
        <FontAwesomeIcon
          fixedWidth
          icon={faMapMarkerAlt}
          className="text-secondary"
        />
        <Button
          color="link"
          size="sm"
          onClick={() => handleAddressClick(name, address)}
          className="mx-2 p-0 border-0"
        >
          <span className="font-sm">{address}</span>
        </Button>
      </div>
      <div className="d-flex align-items-center my-1 font-weight-bold">
        <FontAwesomeIcon
          fixedWidth
          icon={faPhoneAlt}
          className="text-secondary"
        />
        <a
          href={`tel:${phone}`}
          target="_blank"
          className="mx-2 font-sm"
        >
          {phone}
        </a>
      </div>
      <div className="d-flex">
        <FontAwesomeIcon
          fixedWidth
          icon={faClock}
          className="mt-1 text-secondary"
        />

        <BusinessHoursCollapse
          operatingHours={specialHours || regularHours}
          textSize="font-sm"
          isAllDaysShown={false}
        />
      </div>

      <Services
        services={services}
        businessName={name}
        fontSize="font-xs"
        iconSize="2x"
        containerClassName="my-3"
      />

      <div className="d-flex justify-content-around align-items-center">
        {menuData.hasOwnProperty(menuId) && (
          <div className="d-flex flex-column font-weight-bold text-center text-success">
            <span>
              Menu
            </span>
            <span>
              Available
            </span>
          </div>
        )}

        <Button
          outline
          block={!menuData.hasOwnProperty(menuId)}
          color="info"
          size="sm"
          onClick={() => handleGoToOnClick(menuId)}
          className="px-3"
        >
          More Info
        </Button>
      </div>
    </div>
  );
}

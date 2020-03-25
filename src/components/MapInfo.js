import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
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
    phone,
    specialHours,
    regularHours,
    services,
    menuId,
  } = business;

  return (
    <div id="test-div">
      <div className="position-relative mb-1">
        <h6
          id={`${menuId}-heading-info`}
          className="mx-4 text-center text-extra-light font-weight-bold text-truncate"
        >
          {name}
        </h6>
        <UncontrolledTooltip placement="bottom" target={`${menuId}-heading-info`}>
          {name}
        </UncontrolledTooltip>
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
      <div className="d-flex align-items-center mr-4 font-weight-bold">
        <FontAwesomeIcon
          fixedWidth
          icon={faMapMarkerAlt}
          className="text-secondary"
        />
        <Button
          id={`${menuId}-address`}
          color="link"
          size="sm"
          onClick={() => handleAddressClick(name, address)}
          className="mx-2 p-0 border-0 text-truncate"
        >
          <span className="font-sm">{address}</span>
        </Button>
        <UncontrolledTooltip placement="bottom" target={`${menuId}-address`}>
          {address}
        </UncontrolledTooltip>
      </div>
      <div className="d-flex align-items-center mr-4 my-1 font-weight-bold">
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
      <div className="d-flex mr-4">
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

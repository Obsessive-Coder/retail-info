import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import {
  faMapMarkerAlt, faPhoneAlt, faClock, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Services } from './';

const menuData = require('../data/menus.json');

export default function MapInfo({
  business, handleGoToOnClick, handleAddressClick,
  handleCloseOnClick,
}) {
  const { name, address, city, phone, hours, services, menuId } = business;

  return (
    <div id="test-div">
      <div className="position-relative mb-1">
        <h6 className="m-0 text-center text-light font-weight-bold">
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
          onClick={() => handleAddressClick(name, address, city)}
          className="mx-2 p-0 border-0"
        >
          <span className="font-sm">{`${address}, ${city}`}</span>
        </Button>
      </div>
      <div className="d-flex align-items-center mt-1 mb-2 font-weight-bold">
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
          className="text-secondary"
        />

        <div className="flex-fill text-light">
          {hours.split('\n').map(line => (
            <span key={line} className="d-block mx-2 text-capitalize font-weight-bold">
              {line}
            </span>
          ))}
        </div>
      </div>

      <Services
        services={services}
        businessName={name}
        fontSize="font-xs"
        iconSize="lg"
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

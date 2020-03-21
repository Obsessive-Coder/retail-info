import React, { Fragment } from 'react';

import { Button } from 'reactstrap';
import { faCheck, faTimes, faPhoneAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CONSTANTS } from '../utils';

const { BOOLEAN_FIELDS } = CONSTANTS;
const menuData = require('../data/menus.json');

export default function MapInfo({ business, handleGoToOnClick }) {
  return (
    <Fragment>
      <h6 className="text-center">{business.name}</h6>
      <div className="font-weight-bold">
        <FontAwesomeIcon
          fixedWidth
          icon={faPhoneAlt}
        />
        <a
          href={`tel:${business.phone}`}
          target="_blank"
          className="mx-2 font-sm"
        >
          {business.phone}
        </a>
      </div>
      <div className="d-flex mt-1">
        <FontAwesomeIcon
          fixedWidth
          icon={faClock}
        />

        <div className="flex-fill">
          {business.hours.split('\n').map(line => (
            <small key={line} className="d-block mx-2 text-capitalize">
              {line}
            </small>
          ))}
        </div>
      </div>
      <div className="d-flex my-2 text-secondary">
        {BOOLEAN_FIELDS.map(({ propertyName, labelText }) => (
          <div
            key={propertyName}
            className="d-flex flex-column align-items-center flex-fill text-center"
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
      <div className="d-flex justify-content-around align-items-center">
        {menuData.hasOwnProperty(business.menuId) && (
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
          color="dark"
          size="sm"
          onClick={handleGoToOnClick}
        >
          More Info
        </Button>
      </div>
    </Fragment>
  );
}

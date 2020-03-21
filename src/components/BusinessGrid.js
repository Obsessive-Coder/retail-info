import React from 'react'
import { Link } from 'react-router-dom';

import {
  Button, Card, CardImg, CardBody, CardHeader,
} from 'reactstrap';

import {
  faCheck, faTimes, faMapMarkerAlt,
  faClock, faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CONSTANTS } from '../utils';

const { BOOLEAN_FIELDS } = CONSTANTS;

const menuData = require('../data/menus.json');

export default function BusinessGrid({ businesses, handleAddressClick }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 mt-2">
      {businesses.map(business => (
        <div key={business.name} className="col mb-4">
          <Card className="shadow">
            {/* <CardImg
              top
              width="100%"
              alt={business.name}
              src="https://via.placeholder.com/150x75"
            /> */}
            <CardHeader className="py-1 bg-dark text-light font-weight-bold font-lg">
              {business.name}
            </CardHeader>
            <CardBody className="py-2 text-secondary">
              <div className="text-truncate">
                <FontAwesomeIcon
                  fixedWidth
                  icon={faMapMarkerAlt}
                />
                <Link
                  to="#"
                  onClick={() => handleAddressClick(business.name, business.address, business.city)}
                  className="mx-2 font-sm"
                >
                  {`${business.address}, ${business.address}`}
                </Link>
              </div>
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
              <div className="d-flex">
                <FontAwesomeIcon
                  fixedWidth
                  icon={faClock}
                />

                <div className="flex-fill">
                  {business.hours.split('\n').map((line, index) => (
                    <small key={line} className="d-block mx-2 text-capitalize">
                      {line}
                    </small>
                  ))}
                </div>
              </div>

              <div className="d-flex my-3">
                {BOOLEAN_FIELDS.map(({ propertyName, labelText }) => (
                  <div
                    key={propertyName}
                    className="d-flex flex-column align-items-center w-25 text-center"
                  >
                    <FontAwesomeIcon
                      fixedWidth
                      size="2x"
                      icon={business[propertyName] ? faCheck : faTimes}
                      className={business[propertyName] ? 'text-success' : 'text-danger'}
                    />
                    <span className="font-weight-bold font-sm">
                      {labelText}
                    </span>
                  </div>
                ))}
              </div>

              {menuData.hasOwnProperty(business.menuId) && (
                <span className="d-block font-weight-bold font-lg text-center text-success">
                  Menu Available
                </span>
              )}

              <Link
                to={`/retail-info/businesses/${business.menuId}`}
                className="btn btn-block btn-outline-dark"
              >
                More Info
              </Link>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  )
}
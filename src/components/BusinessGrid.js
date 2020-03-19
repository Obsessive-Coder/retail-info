import React from 'react'
import google from 'google-parser';

import {
  Button, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, CardHeader,
} from 'reactstrap';

import {
  faCheck, faTimes, faMapMarker,
  faClock, faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BusinessGrid({ businesses }) {
  const booleanFields = [{
    propertyName: 'isCurbside',
    labelText: 'Curbside',
  }, {
    propertyName: 'isDelivery',
    labelText: 'Delivery',
  }, {
    propertyName: 'isInStore',
    labelText: 'In-Store',
  }, {
    propertyName: 'isDrivethrough',
    labelText: 'DT',
  }];

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
      {businesses.map(business => (
        <div class="col mb-4">
          <Card>
            {/* <CardImg
              top
              width="100%"
              alt={business.name}
              src="https://via.placeholder.com/150x75"
            /> */}
            <CardHeader className="py-1 bg-dark text-light font-weight-bold font-xl">
              {business.name}
            </CardHeader>
            <CardBody className="py-2 text-secondary">
              <div className="text-truncate">
                <FontAwesomeIcon
                  fixedWidth
                  icon={faMapMarker}
                />
                <span className="mx-2">
                  {business.address}
                </span>
              </div>
              <div className="font-weight-bold">
                <FontAwesomeIcon
                  fixedWidth
                  icon={faPhoneAlt}
                />
                <a
                  href={`tel:${business.phone}`}
                  className="mx-2"
                >
                  {business.phone}
                </a>
              </div>
              <div>
                <FontAwesomeIcon
                  fixedWidth
                  icon={faClock}
                />
                <span className="mx-2 text-capitalize">
                  {business.hours}
                </span>
              </div>

              <div className="d-flex my-3">
                {booleanFields.map(({ propertyName, labelText }) => (
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

              <Button
                block
                outline
                color="info"
                onClick={() => alert('This feature is currently being developed.')}
              >
                Menu (coming soon)
              </Button>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  )
}

import React from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Services({
  businessName, services, iconSize,
  fontSize, containerClassName
}) {
  return (
    <div className={`d-flex justify-content-around flex-wrap text-secondary ${containerClassName}`}>
      {services.map(service => (
        <div
          key={`${businessName}-${service}`}
          className="d-flex flex-column align-items-center mx-2 text-center"
        >
          <FontAwesomeIcon
            fixedWidth
            size={iconSize}
            icon={faCheck}
            className={'text-success'}
          />
          <span className={`font-weight-bold text-capitalize ${fontSize}`}>
            {service}
          </span>
        </div>
      ))}
    </div>
  );
}

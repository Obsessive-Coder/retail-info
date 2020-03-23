import React, { Fragment, useState } from 'react';
import { Collapse, Button } from 'reactstrap';
import {
  faAngleUp, faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BusinessHoursCollapse({
  operatingHours, textSize
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  // const copiedOperatingHours = operatingHours.concat([]);
  // const firstDayHours = firstDay.split(': ')
  // firstDayHours.shift();
  // const firstDaySplit = firstDayHours[0].split(' – ');
  // const [ openTime, closeTime ] = firstDaySplit;

  const daysData = operatingHours.map(hours => {
    const splitHours = hours.split(': ')

    const [day, dayHours ] = splitHours

    return { day, dayHours };
  });

  const firstDay = daysData.shift();

  return (
    <div className="flex-fill mx-2">
      <Button
        color="link"
        size="sm"
        onClick={toggleIsOpen}
        className={`d-flex align-items-center p-0 border-0 text-extra-light text-decoration-none ${operatingHours.length > 0 ? 'cursor-pointer': 'cursor-default'}`}
      >
        <div className={`d-inline-block ${textSize}`}>
          {operatingHours.length > 0 ? (
            <Fragment>
              <span className="font-weight-bold">
                {firstDay.day}
              </span>
              <span className="mx-1 text-truncate">
                {firstDay.dayHours}
              </span>
            </Fragment>
          ) : (
            <span className="font-weight-bold">
              Unavailable
            </span>
          )}
        </div>

        {operatingHours.length > 1 && (
          <FontAwesomeIcon
            fixedWidth
            icon={isOpen ? faAngleUp : faAngleDown}
            className="text-secondary"
          />
        )}
      </Button>

      <Collapse
        isOpen={isOpen && daysData.length > 0}
        className="text-left"
      >
        {daysData.map(({ day, dayHours }, index) => (
          <div
            key={`${day}-operating-hours`}
            className={`text-extra-light ${textSize} ${index === 0 ? 'mb-1' : 'my-1'}`}
          >
            <span className="font-weight-bold">
              {day}
            </span>
            <span className="mx-1 text-truncate">
              {dayHours}
            </span>
          </div>
        ))}
      </Collapse>
    </div>
  );
}

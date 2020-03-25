import React, { Fragment, useState } from 'react';
import moment from 'moment';

import { Collapse, Button } from 'reactstrap';
import {
  faAngleUp, faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BusinessHoursCollapse({
  operatingHours, isAllDaysShown, textSize
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  let daysData = operatingHours.map(hours => {
    const splitHours = hours.split(': ')

    const [day, dayHours ] = splitHours

    return { day, dayHours };
  });

  const today = moment().format('dddd').toLowerCase();

  let orderedDaysData = daysData.filter(({ day }) => day.toLowerCase() === today);

  let todayIndex = -1;
  const orderedDays = [today];
  for (let i = 0; i < daysData.length; i++) {
    const dayData = daysData[i];
    const lowerCaseDay = dayData.day.toLowerCase()

    if (lowerCaseDay === today) {
      todayIndex = i;
    }

    if ((todayIndex >= 0) && (i > todayIndex) && (lowerCaseDay !== today)) {
      orderedDaysData.push(dayData)
      orderedDays.push(lowerCaseDay)
    }
  }

  const restOfDaysData = daysData.filter(({ day }) => !orderedDays.includes(day.toLowerCase()));

  daysData = orderedDaysData.concat(restOfDaysData)
  const firstDay = daysData.shift();

  return (
    <div className="flex-md-fill mx-2">
      <Button
        color="link"
        size="sm"
        onClick={toggleIsOpen}
        className={`d-flex position-relative w-100 p-0 border-0 text-extra-light text-decoration-none ${isAllDaysShown && operatingHours.length > 0 ? 'cursor-pointer': 'cursor-default'}`}
      >
        <div className={`d-flex w-100 ${textSize}`}>
          {operatingHours.length > 0 ? (
            <Fragment>
              <span
                style={{ width: isAllDaysShown ? '80px' : '75px' }}
                className="text-left font-weight-bold"
              >
                {firstDay.day}
              </span>

              {firstDay.dayHours.split(', ') ? (
                <div className="d-flex flex-column">
                  {firstDay.dayHours.split(', ').map(dayHour => (
                    <span key={`${dayHour}-today`}>
                      {dayHour}
                    </span>
                  ))}
                </div>
              ) : (
                <span>
                  {firstDay.dayHours}
                </span>
              )}
            </Fragment>
          ) : (
            <span className="font-weight-bold">
              Unavailable
            </span>
          )}
        </div>

        {isAllDaysShown && operatingHours.length > 1 && (
          <FontAwesomeIcon
            fixedWidth
            icon={isOpen ? faAngleUp : faAngleDown}
            className={`position-absolute text-secondary hours-caret`}
          />
        )}
      </Button>

      <Collapse
        isOpen={isOpen && isAllDaysShown && daysData.length > 0}
        className="w-100 text-left"
      >
        {isAllDaysShown && daysData.map(({ day, dayHours }, index) => (
          <div
            key={`${day}-operating-hours`}
            className={`d-flex text-extra-light ${textSize} ${index === 0 ? 'mb-1' : 'my-1'}`}
          >
            <span
              style={{ width: isAllDaysShown ? '80px' : '75px' }}
              className="text-left font-weight-bold"
            >
              {day}
            </span>

            {dayHours.split(', ') ? (
              <div className="d-flex flex-column">
                {dayHours.split(', ').map((dayHour, index) => (
                  <span key={`${dayHour}-other-${index}`}>
                    {dayHour}
                  </span>
                ))}
              </div>
            ) : (
              <span>
                {dayHours}
              </span>
            )}
          </div>
        ))}
      </Collapse>
    </div>
  );
}

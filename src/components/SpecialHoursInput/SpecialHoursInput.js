import React, { Fragment } from 'react';

import { Label, UncontrolledTooltip } from 'reactstrap';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HoursControl } from './subcomponents';

export default function SpecialHoursInput({
  specialHours, handleAddHours
}) {
  return (
    <div>
      <div className="d-flex align-items-center" >
        <Label
          for="hours"
          className="mb-1"
        >
          Special Hours&nbsp;
          <small>(optional)</small>
        </Label>

        <FontAwesomeIcon
          fixedWidth
          id="hours"
          icon={faQuestionCircle}
          className="mx-2 mb-1 text-info outline-none"
        />

        <UncontrolledTooltip
          target="hours"
          innerClassName="text-justify bg-darker"
          arrowClassName="text-danger"
        >
          <p className="text-info">
            This section is for businesses with hours that differ from their regular hours.
          </p>
        </UncontrolledTooltip>
      </div>

      <div className="mb-2">
        {specialHours.map(({ day, timeText }) => (
          <div
            key={day}
            className="d-flex"
          >
            <small
              style={{ width: '40px' }}
              className="d-inline-block font-weight-bold"
            >
              {day}:&nbsp;
            </small>

            <div className="d-flex flex-sm-row flex-sm-fill hours-text">
              {timeText.split(', ').map((splitText, index) => (
                <Fragment key={`${day}-${splitText}-${index}`}>
                  {index === 1 && (
                    <small className="mx-2 font-weight-bold hours-and">
                      and
                    </small>
                  )}
                  <small>{splitText}</small>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      <HoursControl handleAddHours={handleAddHours} />
    </div>
  );
}

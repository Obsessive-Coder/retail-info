import React, { Fragment } from 'react';

import { Button, Label, UncontrolledTooltip } from 'reactstrap';
import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HoursControl } from './subcomponents';

export default function SpecialHoursInput({
  specialHours, handleAddHours, handleRemoveHours
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
        {specialHours.map(({ day, hours }) => (
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

            <div className="d-flex flex-sm-row align-items-sm-center flex-sm-fill hours-text">
              {hours.map((splitText, index) => (
                <Fragment key={`${day}-${splitText}-${index}`}>
                  {index === 1 && (
                    <small className="ml-1 mr-2 font-weight-bold hours-and">
                      and
                    </small>
                  )}

                  <div className="d-flex align-items-center">
                    <small>{splitText}</small>

                    <Button
                      size="sm"
                      onClick={() => handleRemoveHours(day, index)}
                      className="p-0 border-0 bg-transparent outline-none"
                    >
                      <FontAwesomeIcon
                        fixedWidth
                        size="sm"
                        icon={faTimesCircle}
                        className="ml-1 text-danger"
                      />
                    </Button>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      <HoursControl
        specialHours={specialHours}
        handleAddHours={handleAddHours}
      />
    </div>
  );
}

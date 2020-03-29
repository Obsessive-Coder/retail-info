import React, { useState } from 'react';

import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const days = [
  'Sun', 'Mon', 'Tue', 'Wed',
  'Thu', 'Fri', 'Sat',
];

const hours = [
  '12:00 AM',
  '12:30 AM',
  '1:00 AM',
  '1:30 AM',
  '2:00 AM',
  '2:30 AM',
  '3:00 AM',
  '3:30 AM',
  '4:00 AM',
  '4:30 AM',
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
];

export default function HoursControl({ handleAddHours }) {
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Sun');
  const [isOpenTimeOpen, setIsOpenTimeOpen] = useState(false);
  const [selectedOpenTime, setSelectedOpenTime] = useState('9:00 AM');
  const [isCloseTimeOpen, setIsCloseTimeOpen] = useState(false);
  const [selectedCloseTime, setSelectedCloseTime] = useState('5:00 PM');
  const [allSelectedDays] = useState([]);

  const availableDays = days.filter(day => {
    const dayCount = allSelectedDays.filter(selectedDay => day === selectedDay).length;
    return dayCount < 2;
  })

  const handleAddOnClick = () => {
    // let fullDay;

    // switch (selectedDay) {
    //   case 'Sun':
    //     fullDay = 'Sunday';
    //     break;
    //   case 'Mon':
    //     fullDay = 'Monday';
    //     break;
    //   case 'Tue':
    //     fullDay = 'Tuesday';
    //     break;
    //   case 'Wed':
    //     fullDay = 'Wednesday';
    //     break;
    //   case 'Thu':
    //     fullDay = 'Thursday';
    //     break;
    //   case 'Fri':
    //     fullDay = 'Friday';
    //     break;
    //   case 'Sat':
    //     fullDay = 'Saturday';
    //     break;
    //   default:
    //     fullDay = selectedDay;
    //     break;
    // }

    let nextDayIndex = availableDays.indexOf(selectedDay) + 1;
    if (nextDayIndex >= availableDays.length) nextDayIndex = 0;

    handleAddHours(selectedDay, `${selectedOpenTime} – ${selectedCloseTime}`);
    allSelectedDays.push(selectedDay);
    setSelectedDay(availableDays[nextDayIndex]);
  }

  const dropdowns = [{
    isOpen: isDayOpen,
    toggle: setIsDayOpen,
    text: selectedDay,
    items: availableDays,
    handleItemClick: setSelectedDay,
  }, {
    isOpen: isOpenTimeOpen,
    toggle: setIsOpenTimeOpen,
    text: selectedOpenTime,
    items: hours,
    handleItemClick: setSelectedOpenTime,
  }, {
    isOpen: isCloseTimeOpen,
    toggle: setIsCloseTimeOpen,
    text: selectedCloseTime,
    items: hours,
    handleItemClick: setSelectedCloseTime,
  }];

  return (
    <div className="d-flex justify-content-around">
      {availableDays.length === 0 && (
        <small className="text-success">
          Thank you for providing the special operating hours for this business.
        </small>
      )}

      {availableDays.length > 0 && dropdowns.map(({
        isOpen, toggle, text, items, handleItemClick,
      }, index) => (
        <Dropdown
          key={text}
          isOpen={isOpen}
          toggle={() => toggle(!isOpen)}
          className={`flex-grow-1 ${index === 1 ? 'mx-1' : ''}`}
        >
          <DropdownToggle
            caret
            outline
            color="info"
            size="sm"
            className="d-flex justify-content-between align-items-center w-100 text-capitalize shadow"
          >
            <span className="font-sm">{text}</span>
          </DropdownToggle>
          <DropdownMenu
            style={{ maxHeight: '300px', top: '-250px', bottom: '30px' }}
            className="bg-dark shadow overflow-auto"
          >
            {items.map(item => (
              <DropdownItem
                key={item}
                onClick={() => handleItemClick(item)}
                className={`px-2 text-extra-light business-hours-item ${item === text ? 'active' : ''}`}
              >
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ))}

      {availableDays.length > 0 && (
        <Button
          outline
          type="button"
          color="success"
          size="sm"
          className="ml-1 p-0 border-0 bg-transparent text-success shadow-none"
          onClick={handleAddOnClick}
        >
          <FontAwesomeIcon
            fixedWidth
            size="lg"
            icon={faPlus}
          />
        </Button>
      )}
    </div>
  );
}

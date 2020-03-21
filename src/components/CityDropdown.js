import React, { useState } from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function CityDropdown({
  cities, handleLocationItemOnClick
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('all');

  return (
    <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle
        caret
        outline
        color="info"
        className="mx-2 text-capitalize"
      >
        <span className="mx-2">{selectedLocation}</span>
      </DropdownToggle>
      <DropdownMenu>
        {cities.map(city => (
          <DropdownItem
            key={`${city}-dropdown-item`}
            onClick={() => {
              setSelectedLocation(city);
              handleLocationItemOnClick(city);
            }}
            className="text-capitalize"
          >
            {city}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

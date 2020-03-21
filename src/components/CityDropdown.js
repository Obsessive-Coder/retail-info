import React, { useState } from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function CityDropdown({
  cities, handleLocationItemOnClick
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle
        caret
        outline
        color="info"
        className="mx-2"
      >
        Location
      </DropdownToggle>
      <DropdownMenu>
        {cities.map(city => (
          <DropdownItem
            onClick={() => handleLocationItemOnClick(city)}
            className="text-capitalize"
          >
            {city}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

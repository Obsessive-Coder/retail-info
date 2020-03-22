import React, { useState } from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Label
} from 'reactstrap';

export default function FilterDropdown({
  items, labelText, handleItemOnClick
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('all');

  return (
    <div className="mx-3">
      <Label
        for={`${labelText}-dropdown`}
        className="m-0 text-capitalize font-weight-bold"
      >
        {labelText}
      </Label>
      <Dropdown
        id={`${labelText}-dropdown`}
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      >
        <DropdownToggle
          caret
          outline
          color="info"
          size="sm"
          style={{ minWidth: '100px' }}
          className="d-flex justify-content-between align-items-center text-capitalize"
        >
          <span className="mx-2">{selectedItem}</span>
        </DropdownToggle>
        <DropdownMenu>
          {items.map(item => (
            <DropdownItem
              key={`${item}-dropdown-item`}
              onClick={() => {
                setSelectedItem(item);
                handleItemOnClick(item);
              }}
              className="text-capitalize"
            >
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
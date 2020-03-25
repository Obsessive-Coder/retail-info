import React, { useState } from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Label
} from 'reactstrap';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FilterDropdown({
  items, labelText, filteredItem, handleItemOnClick
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(filteredItem || 'all');

  return (
    <div className="mx-3">
      <Label
        for={`${labelText}-dropdown`}
        className="m-0 text-extra-light text-capitalize font-weight-bold"
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
          style={{ width: '100px' }}
          className="d-flex justify-content-between align-items-center text-capitalize"
        >
          <span className="text-truncate">{selectedItem}</span>
        </DropdownToggle>
        <DropdownMenu className="bg-dark shadow overflow-auto filter-dropdown-menu">
          {items.map(item => (
            <DropdownItem
              key={`${item}-dropdown-item`}
              onClick={() => {
                setSelectedItem(item);
                handleItemOnClick(item);
              }}
              className="d-flex align-items-center px-2 bg-dark text-capitalize text-extra-light filter-list-item"
            >
              <FontAwesomeIcon
                fixedWidth
                size="sm"
                icon={faCheck}
                className={`text-success ${item !== selectedItem ? 'invisible' : ''}`}
              />
              <span className="flex-fill mx-2">{item}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

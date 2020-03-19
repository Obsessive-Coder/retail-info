import React, { Component } from 'react';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { BusinessTable, BusinessGrid } from './';

// Restaurant Data File.
const dataFile = require('../data/businesses.json');

export default class BusinessList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: dataFile.businesses || [],
      viewType: 'grid',
    };

    // Bind class methods.
    this.setViewType = this.setViewType.bind(this);
  }

  setViewType(viewType) {
    this.setState(({ viewType: stateViewType}) => viewType !== stateViewType ? ({ viewType }) : null);
  }

  render() {
    const { businesses, viewType } = this.state;
    return (
      <div className="overflow-auto">
        <h1 className="py-3 bg-dark text-light text-center page-heading">
          Restaurants and Bars
        </h1>
        <div>
          <UncontrolledDropdown
            setActiveFromChild
            className="m-2"
          >
            <DropdownToggle
              caret
              outline
              color="info"
            >
              View Type
            </DropdownToggle>
            <DropdownMenu flip={false}>
              <DropdownItem
                onClick={() => this.setViewType('list')}
              >
                List
              </DropdownItem>
              <DropdownItem
                onClick={() => this.setViewType('grid')}
              >
                Grid
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <div className="mx-2">
          {viewType === 'list' && (
            <BusinessTable businesses={businesses} />
          )}

          {viewType === 'grid' && (
            <BusinessGrid businesses={businesses} />
          )}
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react';

import { BusinessGrid } from './';

// Restaurant Data File.
const businessesData = require('../data/businesses.json');

export default class BusinessList extends Component {
  constructor(props) {
    super(props);

    const businesses = businessesData.businesses.filter(({ isOpen }) => isOpen);

    this.state = {
      businesses: businesses || [],
    };

    // Bind class methods.
    this.handleAddressClick = this.handleAddressClick.bind(this);
  }

  handleAddressClick(name, address, city) {
    if ((navigator.platform.indexOf("iPhone") !== -1) ||
     (navigator.platform.indexOf("iPad") !== -1) ||
     (navigator.platform.indexOf("iPod") !== -1)) {
      window.open(`maps://maps.google.com/maps/dir/?daddr=${name}%20${address},%20${city}&amp;ll=`);
    } else {
      window.open(`https://maps.google.com/maps/dir/?daddr=${name}%20${address},%20${city}&amp;ll=`);
    }
  }

  render() {
    const { businesses } = this.state;

    return (
      <div className="mx-2 my-4">
        <BusinessGrid
          businesses={businesses}
          handleAddressClick={this.handleAddressClick}
        />
      </div>
    )
  }
}

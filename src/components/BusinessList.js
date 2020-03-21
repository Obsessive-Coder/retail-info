import React, { Component } from 'react';

import { BusinessGrid, CityDropdown } from './';

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
    this.handleLocationItemOnClick = this.handleLocationItemOnClick.bind(this);
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

  handleLocationItemOnClick(city) {
    let { businesses } = businessesData;
    if (city.toLowerCase() !== 'all') {
      businesses = businesses.filter(({ city: cityData, isOpen }) => (
        isOpen && cityData === city
      ));
    }

    this.setState(() => ({ businesses }));
  }

  render() {
    const { businesses } = this.state;

    let cities = businessesData.businesses.map(({ city }) => city);
    cities = cities.filter((a, b) => cities.indexOf(a) === b);
    cities.unshift('all');

    return (
      <div className="m-2">
        <CityDropdown
          cities={cities}
          handleLocationItemOnClick={this.handleLocationItemOnClick}
        />

        <BusinessGrid
          businesses={businesses}
          handleAddressClick={this.handleAddressClick}
        />
      </div>
    )
  }
}

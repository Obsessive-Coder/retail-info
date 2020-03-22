import React, { Component } from 'react';

import { BusinessGrid, FilterDropdown } from './';

// Restaurant Data File.
const businessesData = require('../data/businesses.json');

export default class BusinessList extends Component {
  constructor(props) {
    super(props);

    const businesses = businessesData.businesses.filter(({ isOpen }) => isOpen);

    this.state = {
      businesses: businesses || [],
      filteredLocation: null,
      filteredService: null,
    };

    // Bind class methods.
    this.handleAddressClick = this.handleAddressClick.bind(this);
    this.handleLocationsItemOnClick = this.handleLocationsItemOnClick.bind(this);
    this.handleServicesItemOnClick = this.handleServicesItemOnClick.bind(this);
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

  handleLocationsItemOnClick(city) {
    let { businesses } = businessesData;
    if (city.toLowerCase() !== 'all') {
      businesses = businesses.filter(({ city: cityData, isOpen }) => (
        isOpen && cityData === city
      ));
    }

    const { filteredService } = this.state;
    if (filteredService && filteredService.toLowerCase() !== 'all') {
      businesses = businesses.filter(({ services }) => (
        services.includes(filteredService)
      ));
    }

    this.setState(() => ({ businesses, filteredLocation: city }));
  }

  handleServicesItemOnClick(service) {
    let { businesses } = businessesData;
    if (service.toLowerCase() !== 'all') {
      businesses = businesses.filter(({ services, isOpen }) => (
        isOpen && services.includes(service)
      ));
    }

    const { filteredLocation } = this.state;
    if (filteredLocation && filteredLocation.toLowerCase() !== 'all') {
      businesses = businesses.filter(({ city }) => filteredLocation === city);
    }

    this.setState(() => ({ businesses, filteredService: service }));
  }

  render() {
    const { businesses } = this.state;

    let cities = businessesData.businesses.map(({ city }) => city);
    cities = cities.filter((a, b) => cities.indexOf(a) === b);
    cities.unshift('all');

    let services = businessesData.businesses.map(({ services }) => services);
    services = [].concat.apply([], services);
    services = services.filter((a, b) => services.indexOf(a) === b);
    services.unshift('all');

    return (
      <div className="m-2">
        <div className="d-flex">
          <FilterDropdown
            items={cities}
            labelText="location"
            handleItemOnClick={this.handleLocationsItemOnClick}
          />

          <FilterDropdown
            items={services}
            labelText="service"
            handleItemOnClick={this.handleServicesItemOnClick}
          />
        </div>

        <BusinessGrid
          businesses={businesses}
          handleAddressClick={this.handleAddressClick}
        />
      </div>
    )
  }
}

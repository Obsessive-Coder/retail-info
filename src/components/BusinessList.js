import React, { Component } from 'react';
import { BusinessTable } from './';

// Restaurant Data File.
const dataFile = require('../data/businesses.json');

export default class BusinessList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: dataFile.businesses || [],
      viewType: 'list',
    };
  }
  render() {
    const { businesses, viewType } = this.state;
    return (
      <div className="overflow-auto">
        {viewType === 'list' && (
          <BusinessTable businesses={businesses} />
        )}
      </div>
    )
  }
}

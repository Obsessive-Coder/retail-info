import React, { Component } from 'react';
// import axios from 'axios';

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
    };

    // Bind class methods.
    this.handleAddressClick = this.handleAddressClick.bind(this);
  }

  handleAddressClick(address) {
    if ((navigator.platform.indexOf("iPhone") != -1) ||
     (navigator.platform.indexOf("iPad") != -1) ||
     (navigator.platform.indexOf("iPod") != -1)) {
      window.open("maps://maps.google.com/maps?daddr=<lat>,<long>&amp;ll=");
    } else {
      window.open(`https://maps.google.com/maps?daddr=${address}&amp;ll=`);
    }
  }

  // componentDidMount() {
    // https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=AIzaSyBWc45Eb4D3pf2A-I3aki-aM8HxMHRPfpc
    // axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=alfanos+oregon+il&key=AIzaSyBWc45Eb4D3pf2A-I3aki-aM8HxMHRPfpc')
    //   .then(result => {
        // CmRaAAAAOmfNZQhEKPzYNWHmtbmLg5Kd7guIP2Pp_QsFd8E3cUH2UewiZHsMJAizWJmYVq8_jfFofTsMFpK-92G_27ZowH7y4MjwyBQJkrLhu9meCJbyRvT1rQSbkjTAw4yvzGAWEhAHoq0pPnjJqjnPhsvd4v74GhRZ7gwkZnGQNWsOWM0Ao97ztYyUzw
        // console.log(result.data);

        // axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyBWc45Eb4D3pf2A-I3aki-aM8HxMHRPfpc')
        // .then(resultX => {
        //   console.log(resultX.data);
        // })
      // })
      // .catch(error => console.log(error));
  // }

  render() {
    const { businesses } = this.state;

    return (
      <div className="overflow-auto">
        <h1 className="py-3 bg-dark text-light text-center page-heading">
          Restaurants and Bars
        </h1>

        <div className="mx-2">
          <BusinessGrid businesses={businesses} handleAddressClick={this.handleAddressClick} />
        </div>
      </div>
    )
  }
}

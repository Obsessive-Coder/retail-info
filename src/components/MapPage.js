import React, { Component } from 'react';
import {
  Map, Marker , GoogleApiWrapper, InfoWindow
} from 'google-maps-react';
import { ListGroup } from 'reactstrap';

import { MapInfo, MapListItem } from './';

const { businesses } = require('../data/businesses.json')

export class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: businesses || [],
      selectedBusiness: null,
      activeMarker: null,
      isInfoWindowShown: false,
      mapCenterLocation: {
        lat: 42.030169,
        lng: -89.363343
      },
    };

    // Bind class methods.
    this.handleMarkerOnClick = this.handleMarkerOnClick.bind(this);
    this.handleMapOnClick = this.handleMapOnClick.bind(this);
    this.handleBusinessItemOnClick = this.handleBusinessItemOnClick.bind(this);
    this.handleAddressClick = this.handleAddressClick.bind(this);
  }

  handleMarkerOnClick(markerProps, marker) {
    this.setState({
      selectedBusiness: markerProps.business,
      activeMarker: marker,
      isInfoWindowShown: true
    })
  }

  handleMapOnClick() {
    this.setState(({ isInfoWindowShown }) => isInfoWindowShown ? ({
      isInfoWindowShown: false,
      activeMarker: null,
      selectedBusiness: null
    }) : null);
  }

  handleBusinessItemOnClick(business) {
    this.setState(() => ({ mapCenterLocation: business.location }));
  }

  handleAddressClick(name, address) {
    if ((navigator.platform.indexOf("iPhone") !== -1) ||
     (navigator.platform.indexOf("iPad") !== -1) ||
     (navigator.platform.indexOf("iPod") !== -1)) {
      window.open(`maps://maps.google.com/maps/dir/?daddr=${name}%20${address}&amp;ll=`);
    } else {
      window.open(`https://maps.google.com/maps/dir/?daddr=${name}%20${address}&amp;ll=`);
    }
  }

  render() {
    const {
      businesses,
      activeMarker,
      isInfoWindowShown,
      selectedBusiness,
      mapCenterLocation,
    } = this.state;

    const { google } = this.props;

    return (
      <div className="d-flex">
        <div style={{ width: '35%'}}>
          <div className="py-2">
            <h2 className="text-center">Businesses</h2>
          </div>
          <div
            style={{ width: '35%', top: '18%', bottom: 0, right: 0, left: 0 }}
            className="position-absolute overflow-auto"
          >
            <ListGroup className="mb-3">
              {businesses.map(business => (
                <MapListItem
                  business={business}
                  handleItemOnClick={this.handleBusinessItemOnClick}
                  handleAddressClick={this.handleAddressClick}
                />
              ))}
            </ListGroup>
          </div>
        </div>

        <div className="flex-fill">
          <Map
            key={`${mapCenterLocation.lat}-${mapCenterLocation.lng}`}
            google={google}
            zoom={12}
            initialCenter={mapCenterLocation}
            onClick={this.handleMapOnClick}
            containerStyle={{ width: '65%', top: '9%', bottom: 0, right: 0 }}
            className="h-auto"
          >
            {businesses.map((business, index) => (
              <Marker
                key={index}
                id={index}
                title={business.name}
                name={business.name}
                business={business}
                position={business.location}
                onClick={this.handleMarkerOnClick}
              />
            ))}
            <InfoWindow
              marker={activeMarker}
              visible={isInfoWindowShown}
              onClose={this.handleMapOnClick}
            >
              <div style={{ minWidth: '200px' }}>
                {selectedBusiness && (
                  <MapInfo business={selectedBusiness} />
                )}
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWc45Eb4D3pf2A-I3aki-aM8HxMHRPfpc'
})(MapPage);

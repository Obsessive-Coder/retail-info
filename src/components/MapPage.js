import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button, Collapse, ListGroup } from 'reactstrap';
import {
  faAngleRight, faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Map, Marker , GoogleApiWrapper, InfoWindow
} from 'google-maps-react';
import { MapListItem, MapInfo, FilterDropdown } from './'

const businessesData = require('../data/businesses.json');

export class MapPage extends Component {
  constructor(props) {
    super(props);

    const businesses = businessesData.businesses.filter(({ isOpen }) => isOpen);

    this.state = {
      isSidebarOpen: false,
      businesses: businesses || [],
      selectedBusiness: null,
      activeMarker: null,
      isInfoWindowShown: false,
      filteredLocation: null,
      filteredService: null,
      mapCenterLocation: {
        lat: 42.030169,
        lng: -89.363343
      },
    };

    // Bind class methods.
    this.toggleIsSidebarOpen = this.toggleIsSidebarOpen.bind(this);
    this.handleMarkerOnClick = this.handleMarkerOnClick.bind(this);
    this.handleMapOnClick = this.handleMapOnClick.bind(this);
    this.handleInfoWindowOnOpen = this.handleInfoWindowOnOpen.bind(this);
    this.handleBusinessItemOnClick = this.handleBusinessItemOnClick.bind(this);
    this.handleLocationsItemOnClick = this.handleLocationsItemOnClick.bind(this);
    this.handleServicesItemOnClick = this.handleServicesItemOnClick.bind(this);
    this.handleAddressClick = this.handleAddressClick.bind(this);
    this.handleGoToOnClick = this.handleGoToOnClick.bind(this);
  }

  toggleIsSidebarOpen() {
    this.setState(({ isSidebarOpen }) => ({ isSidebarOpen: !isSidebarOpen }));
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

  handleInfoWindowOnOpen() {
    const mapInfo = (
      <MapInfo
        business={this.state.selectedBusiness}
        handleGoToOnClick={this.handleGoToOnClick}
      />
    );
    ReactDOM.render(
      React.Children.only(mapInfo),
      document.getElementById("info-window")
    );
  }

  handleBusinessItemOnClick(business) {
    this.setState(() => ({
      mapCenterLocation: business.location
    }));
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

  handleGoToOnClick() {
    const { selectedBusiness: { menuId } } = this.state;
    const { history } = this.props;
    history.push(`/retail-info/businesses/${menuId}`);
  }

  render() {
    const {
      isSidebarOpen,
      businesses,
      activeMarker,
      isInfoWindowShown,
      selectedBusiness,
      mapCenterLocation,
    } = this.state;

    const { google } = this.props;

    let cities = businessesData.businesses.map(({ city }) => city);
    cities = cities.filter((a, b) => cities.indexOf(a) === b);
    cities.unshift('all');

    let services = businessesData.businesses.map(({ services }) => services);
    services = [].concat.apply([], services);
    services = services.filter((a, b) => services.indexOf(a) === b);
    services.unshift('all');

    return (
      <div className="d-flex" style={{ height: '90vh' }}>
        <div className={`position-relative border-right border-dark bg-dark map-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
          <div className={`d-flex justify-content-between align-items-center py-1 text-secondary sidebar-collapse-header ${!isSidebarOpen ? 'h-100' : ''}`}>
            {isSidebarOpen && (
              <div className="d-flex flex-fill">
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
            )}

            <Button
              color="link"
              onClick={this.toggleIsSidebarOpen}
              className={`p-0 border-0 text-decoration-none ${!isSidebarOpen ? 'w-100 h-100 d-flex flex-column align-items-center' : ''}`}
            >
              <FontAwesomeIcon
                fixedWidth={isSidebarOpen}
                size={isSidebarOpen ? '2x' : '3x'}
                icon={isSidebarOpen ? faAngleLeft : faAngleRight}
                className="text-success"
              />
              {!isSidebarOpen && (
                <p className="mx-auto my-3 text-nowrap font-xxl text-success vertical-text">Show List</p>
              )}
            </Button>
          </div>

          <Collapse isOpen={isSidebarOpen} className="position-absolute w-100 sidebar-collapse">
            <ListGroup className="mb-3" className="pb-5 overflow-auto">
              {businesses.map(business => {
                const isSelected = isInfoWindowShown && selectedBusiness.name === business.name;
                return (
                  <MapListItem
                    key={`${business.name}-${business.city}-${isSelected}`}
                    business={business}
                    isSelected={isSelected}
                    handleItemOnClick={this.handleBusinessItemOnClick}
                    handleAddressClick={this.handleAddressClick}
                  />
                );
              })}
            </ListGroup>
          </Collapse>
        </div>

        <div className="flex-fill">
          <Map
            key={`${mapCenterLocation.lat}-${mapCenterLocation.lng}`}
            google={google}
            zoom={12}
            initialCenter={mapCenterLocation}
            onClick={this.handleMapOnClick}
            className="position-relative"
            containerStyle={{ height: '90%' }}
          >
            {businesses.map((business, index) => (
              <Marker
                key={index}
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
              onOpen={this.handleInfoWindowOnOpen}
            >
              <div id="info-window" />
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


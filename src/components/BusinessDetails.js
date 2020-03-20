import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Map, Marker , GoogleApiWrapper } from 'google-maps-react';
import { MenuTabs } from './';

// Restaurant Data File.
const businessData = require('../data/businesses.json')
const menuData = require('../data/menus.json');

export class BusinessDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business: null,
      menuItems: [],
    };

    // Bind class methods.
    this.handleAddressClick = this.handleAddressClick.bind(this);
  }

  handleAddressClick() {
    const { business: { name, address } } = this.state;

    if ((navigator.platform.indexOf("iPhone") !== -1) ||
     (navigator.platform.indexOf("iPad") !== -1) ||
     (navigator.platform.indexOf("iPod") !== -1)) {
      window.open(`maps://maps.google.com/maps/dir/?daddr=${name}%20${address}&amp;ll=`);
    } else {
      window.open(`https://maps.google.com/maps/dir/?daddr=${name}%20${address}&amp;ll=`);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { menuId } = this.props.match.params;
    const menuItems = menuData[menuId] || [];
    const business = businessData.businesses.filter(business => business.menuId === menuId)[0];
    const { name, address } = business;

    const { google } = this.props;
    const map = new google.maps.Map(<div></div>);

    var service = new google.maps.places.PlacesService(map);

    const request = {
      query: `${name} ${address}`,
      fields: ['photos', 'geometry'],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          const {
            geometry: { location: { lat, lng }},
            photos,
          } = results[i];
          if (photos) {
            business.image = photos[0].getUrl();
          }

          business.location = {
            lat: lat(),
            lng: lng(),
          };
        }

        this.setState(() => ({ business, menuItems }));
      }
    });
  }

  render() {
    const { business, menuItems } = this.state;
    const { google } = this.props;

    if (!business) return null;

    const {
      name,
      address,
      phone,
      hours,
      image,
      location,
    } = business;

    const booleanFields = [{
      propertyName: 'isCurbside',
      labelText: 'Curbside',
    }, {
      propertyName: 'isDelivery',
      labelText: 'Delivery',
    }, {
      propertyName: 'isInStore',
      labelText: 'In-Store',
    }, {
      propertyName: 'isDrivethrough',
      labelText: 'D-T',
    }];

    return (
      <div>
        <h1 className="py-3 bg-dark text-light text-center page-heading">
          Restaurants and Bars
        </h1>
        <div className="d-flex flex-column flex-md-row">
          <div className="mb-4 px-1 pb-3 mb-md-0 border-right border-bottom details-sidebar">
            <img
              src={image}
              alt={name}
              className="w-100 h-auto business-details-image"
            />
            <div className="p-3">
              <h2 className="mb-0 text-center text-dark business-heading">
                {name}
              </h2>
              <Link
                to="#"
                onClick={this.handleAddressClick}
                className="mx-2"
              >
                {address}
              </Link>
              <div className="d-sm-flex flex-md-column justify-content-sm-around text-center text-secondary">
                <div className="d-flex justify-content-around font-lg">
                  <span className="font-weight-bold">Phone:</span>
                  <a
                    href={`tel:${phone}`}
                    className="mx-2"
                  >
                    {phone}
                  </a>
                </div>
                <div className="d-flex justify-content-around font-lg">
                  <span className="font-weight-bold">Hours:</span>
                  <span className="mx-2 text-capitalize">{hours}</span>
                </div>
              </div>
              <div className="d-flex my-3 text-secondary">
                {booleanFields.map(({ propertyName, labelText }) => (
                  <div
                    key={propertyName}
                    className="d-flex flex-column align-items-center flex-fill text-center"
                  >
                    <FontAwesomeIcon
                      fixedWidth
                      size="2x"
                      icon={business[propertyName] ? faCheck : faTimes}
                      className={business[propertyName] ? 'text-success' : 'text-danger'}
                    />
                    <span className="font-weight-bold font-sm">
                      {labelText}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {menuItems.length > 0 && (
              <div className="px-4 px-sm-5 px-md-0">
                <Map
                  google={google}
                  zoom={16}
                  initialCenter={location}
                  style={{ position: 'relative',  width: '100%', height: '200px' }}
                  className="position-relative"
                >
                  <Marker
                    position={location}
                    onClick={this.handleAddressClick}
                  />
                </Map>
              </div>
            )}
          </div>
          <div className="flex-fill px-4 py-2">
            <h3 className="text-center border-bottom menu-heading">Menu</h3>

            {menuItems.length === 0 && (
              <div className="text-center">
                <p className="font-weight-bold font-xl text-dark">
                  No Menu Available
                </p>
                <span className="font-lg text-secondary">
                  Please check back later as we are always updating the site.
                </span>
                <p className="font-lg text-secondary">
                  If you have a menu for this business, please email it to&nbsp;
                  <a href="mailto:jaredhuff85@gmail.com?Subject=Retail%20Info">Jared</a>
                  .
                </p>

                <div>
                  <Map
                    google={google}
                    zoom={16}
                    initialCenter={location}
                    style={{ position: 'relative',  width: '100%', height: '350px' }}
                    className="position-relative"
                  >
                    <Marker
                      position={location}
                      onClick={this.handleAddressClick}
                    />
                  </Map>
                </div>
              </div>
            )}

            {menuItems.length > 0 && (
              <MenuTabs menuItems={menuItems} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWc45Eb4D3pf2A-I3aki-aM8HxMHRPfpc'
})(BusinessDetails);

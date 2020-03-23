import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import {
  faMapMarkerAlt, faPhoneAlt, faClock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Map, Marker , GoogleApiWrapper } from 'google-maps-react';
import { MenuTabs, Services, BusinessHoursCollapse } from './';

// Restaurant Data File.
const businessData = require('../data/businesses.json');
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
    const { name, address, city } = business;

    const { google } = this.props;
    const map = new google.maps.Map(<div></div>);

    var service = new google.maps.places.PlacesService(map);

    const request = {
      query: `${name} ${address}, ${city} IL`,
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
      city,
      phone,
      specialHours,
      regularHours,
      image,
      location,
    } = business;

    return (
      <div>
        <div className="d-flex flex-column flex-md-row">
          <div className="mb-4 px-1 pb-3 mb-md-0 bg-dark details-sidebar">
            <img
              src={image}
              alt={name}
              className="w-100 h-auto business-details-image"
            />
            <div className="pt-3 px-3">
              <h2 className="mb-0 text-center text-extra-light font-xxl business-heading">
                {name}
              </h2>


              <div className="d-flex align-items-center my-2 font-weight-bold">
                <FontAwesomeIcon
                  fixedWidth
                  icon={faMapMarkerAlt}
                  className="text-secondary"
                />
                <Link
                  to="#"
                  onClick={this.handleAddressClick}
                  className="d-inline-block mx-2 text-center text-truncate"
                >
                  {address}
                </Link>
              </div>

              <div className="d-flex align-items-center my-2 font-weight-bold">
                <FontAwesomeIcon
                  fixedWidth
                  icon={faPhoneAlt}
                  className="text-secondary"
                />
                <a
                  href={`tel:${phone}`}
                  target="_blank"
                  className="mx-2"
                >
                  {phone}
                </a>
              </div>

              <div className="d-flex my-2">
                <FontAwesomeIcon
                  fixedWidth
                  icon={faClock}
                  className="mt-1 text-secondary"
                />

                <BusinessHoursCollapse
                  operatingHours={specialHours || regularHours}
                  textSize="font-sm"
                />
              </div>

              <Services
                services={business.services}
                businessName={business.name}
                iconSize="lg"
                fontSize="font-sm"
                containerClassName="my-3"
              />
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
          <div className="flex-fill px-4 py-2 bg-light">
            <h3 className="py-2 text-center text-extra-light bg-dark border-bottom border-warning menu-heading">
              Menu
            </h3>

            {menuItems.length > 0 ? (
              <MenuTabs menuItems={menuItems} />
            ) : (
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
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWc45Eb4D3pf2A-I3aki-aM8HxMHRPfpc'
})(BusinessDetails);

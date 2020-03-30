import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import {
  faMapMarkerAlt, faPhoneAlt, faClock, faGlobe,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Map, Marker , GoogleApiWrapper } from 'google-maps-react';
import { DetailsTabs, Services, BusinessHoursCollapse, ImageCarousel } from './';

// Restaurant Data File.
const businessData = require('../data/businesses.json');

export class BusinessDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { business: null };

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
    const { google, match } = this.props;
    const { menuId } = match.params;
    const business = businessData.businesses.filter(business => business.menuId === menuId)[0];

    const map = new google.maps.Map(<div></div>);

    var service = new google.maps.places.PlacesService(map);

    const request = {
      placeId: business.placeId,
      fields: ['url', 'price_level', 'rating', 'user_ratings_total', 'reviews'],
    };

    service.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const {
          url,
          price_level,
          rating,
          user_ratings_total,
          reviews,
        } = result;

        business.googleUrl = url;
        business.priceLevel = price_level;
        business.rating = rating;
        business.ratingsCount = user_ratings_total;
        business.reviews = reviews;

        this.setState(() => ({ business }));
      }
    })
  }

  render() {
    const { business } = this.state;
    const { google } = this.props;

    if (!business) return null;

    const {
      name,
      address,
      phone,
      specialHours,
      regularHours,
      location,
      photos,
      website,
      priceLevel,
    } = business;

    let cost;
    let costColor;

    switch (priceLevel) {
      case 0:
        cost = 'Free';
        costColor = 'text-success';
        break;
      case 1:
        cost = 'Inexpensive';
        costColor = 'text-success';
        break;
      case 2:
        cost = 'Moderate';
        costColor = 'text-warning';
        break;
      case 3:
        cost = 'Expensive';
        costColor = 'text-warning';
        break;
      case 1:
        cost = 'Very Expensive';
        costColor = 'text-danger';
        break;
      default:
        cost = 'Unknown';
        costColor = 'text-info';
        break;
    }

    return (
      <div>
        <div className="d-flex flex-column flex-md-row">
          <div className="mb-4 px-1 pb-3 mb-md-0 bg-dark details-sidebar">
            {photos.length > 1 ? (
              <ImageCarousel photos={photos} />
            ) : (
              <img
                src={photos[0]}
                alt={name}
                className="w-100 business-details-image"
              />
            )}

            <div className="d-flex flex-column align-items-center pt-3 px-3">
              <h2 className="mb-0 text-center text-extra-light font-xl business-heading">
                {name}
              </h2>

              <div>
                <div>
                  <div className="d-flex align-items-center my-2 font-weight-bold">
                    <FontAwesomeIcon
                      fixedWidth
                      icon={faMapMarkerAlt}
                      className="text-secondary"
                    />
                    <Link
                      to="#"
                      onClick={this.handleAddressClick}
                      className="mx-2 text-center text-truncate address-link"
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

                  {website && (
                    <div className="d-flex align-items-center my-2 font-weight-bold">
                      <FontAwesomeIcon
                        fixedWidth
                        icon={faGlobe}
                        className="text-secondary"
                      />
                      <a
                        href={website}
                        target="_blank"
                        className="mx-2"
                      >
                        Visit Our Website
                      </a>
                    </div>
                  )}

                  <div className="d-flex align-items-center my-2 font-weight-bold">
                    <FontAwesomeIcon
                      fixedWidth
                      icon={faDollarSign}
                      className="text-secondary"
                    />
                    <span className={`mx-2 ${costColor}`}>
                      {cost}
                    </span>
                  </div>
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
                    isAllDaysShown={true}
                  />
                </div>
              </div>

              <Services
                services={business.services}
                businessName={business.name}
                iconSize="lg"
                fontSize="font-sm"
                containerClassName="my-3"
              />
            </div>

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
          </div>
          <div className="flex-fill px-4 py-2 bg-light">
            <DetailsTabs business={business} />
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWc45Eb4D3pf2A-I3aki-aM8HxMHRPfpc'
})(BusinessDetails);

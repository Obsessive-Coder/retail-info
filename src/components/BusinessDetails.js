import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText } from 'reactstrap';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Restaurant Data File.
const businessData = require('../data/businesses.json')
const menuData = require('../data/menus.json');

export default class BusinessDetails extends Component {
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
    const { business: { address } } = this.state;

    if ((navigator.platform.indexOf("iPhone") != -1) ||
     (navigator.platform.indexOf("iPad") != -1) ||
     (navigator.platform.indexOf("iPod") != -1)) {
      window.open("maps://maps.google.com/maps?daddr=<lat>,<long>&amp;ll=");
    } else {
      window.open(`https://maps.google.com/maps?daddr=${address}&amp;ll=`);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { menuId } = this.props.match.params;
    const menuItems = menuData[menuId] || [];
    const business = businessData.businesses.filter(business => business.menuId === menuId)[0];

    this.setState(() => ({ business, menuItems }))
  }

  render() {
    const { business, menuItems } = this.state;

    if (!business) return null;

    const {
      name,
      address,
      phone,
      hours,
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
        <div className="d-flex flex-column flex-md-row mt-4">
          <div className="mb-4 px-4 mb-md-0 border-right border-bottom">
            <h2 className="mb-0 text-center text-dark business-heading">
              {name}
            </h2>
            {/* <p className="mb-0 text-center text-secondary">{address}</p> */}
            <Link
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
          <div className="flex-fill px-4">
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
              </div>
            )}

            <div>
              {menuItems.map(({ name, price, subText }) => (
                <Card
                  key={`${name}-${price}`}
                  body
                  className="d-flex flex-sm-row align-items-center mb-2 bg-light shadow-sm"
                >
                  <CardTitle className="flex-fill d-flex flex-column mb-2 mb-sm-0  text-dark font-weight-bold font-lg">
                    <span>{name}</span>
                    {subText && (
                      <small className="font-italic">{subText}</small>
                    )}
                  </CardTitle>
                  <CardText className="text-dark font-weight-bold font-xl">
                    {`$${price.toFixed(2)}`}
                  </CardText>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

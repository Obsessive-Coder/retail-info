import React, { Fragment, useState } from 'react';

import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import { MenuCarousel, BusinessReviews, NoMenu, NoReviews } from './';

export default function DetailsTabs({ business }) {
  const {
    googleUrl,
    menuPhotos,
    rating,
    ratingsCount,
    reviews,
  } = business;

  const [activeTabIndex, setActiveTabIndex] = useState(menuPhotos ? 0 : 1);

  const menuPhotoUrls = menuPhotos || [];

  const detailTabs = [{
    textLabel: 'Menu',
    content: menuPhotoUrls.length === 0 ? (
      <NoMenu />
    ) : (
      <MenuCarousel photos={menuPhotoUrls} />
    )
  }, {
    textLabel: 'Reviews',
    content: reviews.length === 0 ? (
      <NoReviews googleUrl={googleUrl} />
    ) : (
      <BusinessReviews
        googleUrl={googleUrl}
        rating={rating}
        ratingsCount={ratingsCount}
        reviews={reviews}
      />
    )
  }];

  return (
    <div className="text-center text-extra-light bg-dark border-bottom border-warning rounded">
      <Nav tabs className="border-darker">
        {detailTabs.map(({ textLabel }, index) => (
          <NavItem key={`${textLabel}-tab`} className="flex-fill details-tab">
            <NavLink
              onClick={() => setActiveTabIndex(index)}
              className={`border-top-0 border-right-0 border-left-0 ${activeTabIndex === index ? 'bg-dark text-info border-warning' : 'text-secondary'}`}
            >
              {textLabel}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTabIndex}>
        {detailTabs.map(({ textLabel, content }, index) => (
          <TabPane
            key={`${textLabel}-content`}
            tabId={index}
            className="p-3"
          >
            {content}
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
}

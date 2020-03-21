import React, { useState } from 'react'
import {
  Card, CardTitle, CardText, TabContent,
  TabPane, Nav, NavItem, NavLink
} from 'reactstrap';

export default function MenuTabs({ menuItems }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const displayedCategories = menuItems.map(({ category }) => category);

  const categories = displayedCategories.filter((a, b) => displayedCategories.indexOf(a) === b);

  const otherIndex = categories.indexOf('other');

  if (otherIndex >= 0) {
    categories.splice(otherIndex, 1);
    categories.push('other');
  }

  const separatedMenu = { all: menuItems };

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const categoryMenuItems = menuItems.filter(({
      category: itemCategory
    }) => (category === itemCategory));

    separatedMenu[category] = categoryMenuItems;
  }

  categories.unshift('all');

  return (
    <div>
      <Nav tabs className="mb-2">
        {categories.map((category, index) => (
          <NavItem key={`${category}-nav`} className="flex-fill">
            <NavLink
              onClick={() => setActiveTabIndex(index)}
              className={`text-capitalize cursor-pointer border-right rounded-0 ${activeTabIndex === index ? 'bg-dark text-info' : 'text-secondary'}`}
            >
              {category}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTabIndex} className="menu-tab-content">
        {categories.map((category, index) => (
          <TabPane
            key={`${category}-pane`}
            tabId={index}
          >
            <div>
              {separatedMenu[category].map(({ name, price, subText }) => (
                <Card
                  key={`${name}-${price}`}
                  body
                  className="d-flex flex-sm-row align-items-center mb-2 bg-light shadow-sm"
                >
                  <CardTitle className="flex-fill d-flex flex-column mb-2 mb-sm-0 text-info font-weight-bold font-lg">
                    <span>{name}</span>
                    {subText && (
                      subText.split('\n').map(line => (
                        <small key={line} className="font-italic">
                          {line}
                        </small>
                      ))
                    )}
                  </CardTitle>
                  <CardText className="text-info font-weight-bold font-xl">
                    {`$${price.toFixed(2)}`}
                  </CardText>
                </Card>
              ))}
            </div>
          </TabPane>
        ))}
      </TabContent>
    </div>
  )
}

import React from 'react';

export default function NoMenu() {
  return (
    <div>
      <h2 className="text-warning">No Menu Available</h2>
        <p className="m-0 text-justify text-info">
          Please use one of the following methods to share photos of menus:
        </p>
        <ul>
          <li className="bg-dark rounded-0 text-left text-info">
            Email Jared at jaredhuff85@gmail.com
          </li>
          <li className="bg-dark rounded-0 text-left text-info">
            Send a personal message to Jared on FB
          </li>
          <li className="bg-dark rounded-0 text-left text-info">
            Comment on any FB posts about this site
          </li>
        </ul>
    </div>
  );
}

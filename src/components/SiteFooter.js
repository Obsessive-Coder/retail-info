import React from 'react';

export default function SiteFooter() {
  return (
    <div
      style={{ bottom: 0, left: 0, right: 0 }}
      className="position-sticky px-3 py-2 bg-dark text-center"
    >
      <a
        target="_blank"
        href="https://www.buymeacoffee.com/P8xFVtj"
        className="d-inline-flex align-items-center rounded-circle coffee-button"
        style={{ width: '48px', height: '48px' }}
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt="Buy me a coffee"
          className="mx-auto"
        />
        {/* <span
          style={{ fontSize: '28px !important'}}
          className="mx-3"
        >
          Buy me a coffee
        </span> */}
      </a>
    </div>
  );
}

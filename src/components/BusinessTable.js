import React from 'react'

import {
  faCheck, faTimes, faMapMarker,
  faClock, faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BusinessTable({ businesses }) {
  const headerColumns = Object.keys(businesses[0]);

  return (
    <table className="table table-striped">
      <thead className="thead-dark text-center">
        <tr>
          {headerColumns.map(column => (
            <th key={`${column}-header`} className="text-capitalize">
              {column.startsWith('is') ? column.replace('is', '') : column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="text-center text-secondary">
        {businesses.map(business => (
          <tr key={business.name}>
            {Object.keys(business).map(column => (
                <td key={`${column}-data`} className="text-capitalize">
                  {column === 'phone' ? (
                    <a
                      href={`tel:${business[column]}`}
                      className="font-sm"
                    >
                      {business[column]}
                    </a>
                  ) : (
                    <span className={column === 'name' ? 'font-weight-bold' : 'font-sm'}>
                      {typeof business[column] === 'string' ? (
                        business[column]
                      ) : (
                        <FontAwesomeIcon
                          fixedWidth
                          size="lg"
                          icon={business[column] ? faCheck : faTimes}
                          className={business[column] ? 'text-success' : 'text-danger'}
                        />
                      )}
                    </span>
                  )}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

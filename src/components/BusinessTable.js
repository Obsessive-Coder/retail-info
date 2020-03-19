import React from 'react'

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

      <tbody className="text-center">
        {businesses.map(business => (
          <tr key={business.name}>
            {Object.keys(business).map(column => (
                <td key={`${column}-data`}>
                  {column === 'phone' ? (
                    <a href={`tel:${business[column]}`}>
                      {business[column]}
                    </a>
                  ) : (
                    <span className={column === 'name' ? 'font-weight-bold' : 'font-sm'}>
                      {typeof business[column] === 'string' ? (
                        business[column]
                      ) : (
                        business[column] === true ? 'yes' : 'no'
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

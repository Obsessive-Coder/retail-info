const fs = require('fs');

const businessesData = require('./businesses.json');

// const businesses = businessesData.businesses.map(business => {
//   const fields = [{
//     prop: 'isCurbside',
//     service: 'curbside',
//   }, {
//     prop: 'isDelivery',
//     service: 'delivery',
//   }, {
//     prop: 'isDrivethrough',
//     service: 'D-T',
//   }, {
//     prop: 'isInStore',
//     service: 'in-store',
//   }]

//   let services = fields.map(({ prop, service }) => {
//     const businessService = business[prop] ? service : null;
//     delete business[prop];
//     return businessService;
//   });

//   services = services.filter(service => service);

//   return {
//     ...business,
//     services,
//   };
// });

// fs.writeFile('businesses.json', JSON.stringify({ businesses }, null, 2), (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });


// fs.readFile('./restaurants.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   const records = data.replace(/(\r\n|\n|\r)/gm, "").split(':');
//   const columns = records[0].split(';');
//   records.splice(0, 1);
//   records.splice(records.length - 1, 1);

//   const businesses = records.map(record => {
//     const splitRecord = record.split(';');

//     const restaurantData = {};

//     for (let i = 0; i < columns.length; i++) {
//       const columnName = columns[i];
//       restaurantData[columnName] = splitRecord[i];
//     }

//     return restaurantData;
//   });

//   fs.writeFile('restaurants.json', JSON.stringify({ businesses }, null, 2), (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });
// });
const Client = require("@googlemaps/google-maps-services-js").Client;
const fs = require('fs');

const businessesJSON = require('./businesses.json');

const newBusinessesJSON = require('./newBusinesses.json');

const updatedBusinessesJSON = require('./updatedBusinesses.json');

const client = new Client({});

const apiKey = 'AIzaSyDdYR63yO2dIw6J0amjUkpTa0xa_SvCVMY';
const timeout = 5000;

const priceLevels = [{
  level: undefined,
  description: 'unknown',
}, {
  level: 0,
  description: 'Free',
}, {
  level: 1,
  description: 'Inexpensive',
}, {
  level: 2,
  description: 'Moderate',
}, {
  level: 3,
  description: 'Expensive',
}, {
  level: 4,
  description: 'Very Expensive',
}];

const getGoogleData = () => {
  const businessRequests = newBusinessesJSON.map(businessData => {
    let business;
    return client.findPlaceFromText({
      params: {
        // input: `+1 ${businessData.phone}`,
        // inputtype: 'phonenumber',
        input: `${businessData.name} ${businessData.city} IL`,
        inputtype: 'textquery',
        key: apiKey,
      },
      timeout
    })
    .then(({ data }) => {

      if (!data.candidates[0]) {
        console.log(businessData.name, data)
      }

      const { place_id } = data.candidates[0];
      return client.placeDetails({
        params: {
          place_id,
          key: apiKey,
        },
        timeout
      });
    })
    .then(({ data: { result: detailsResult } }) => {
      const {
        reviews,
        name,
        rating,
        website,
        types,
        address_components,
        price_level,
        photos: photosData,
        vicinity: address,
        user_ratings_total: ratingsCount,
        formatted_phone_number: phone,
        geometry: { location },
        opening_hours,
      } = detailsResult;

      let isOpenNow = undefined;
      let regularHours = [];
      if (opening_hours) {
        isOpenNow = opening_hours.open_now;
        regularHours = opening_hours.weekday_text;
      }

      const city = address_components.filter(component => (
        component.types.includes('locality')
      ))[0].short_name;

      const priceLevel = priceLevels.filter(({ level }) => (
        level === price_level
      ))[0].description;

      business = {
        ...businessData,
        name,
        phone,
        address,
        city,
        regularHours,
        isOpenNow,
        priceLevel,
        rating,
        ratingsCount,
        website,
        types,
        location,
        reviews,
      };

      let photoRequests = [];
      if (photosData) {
        photoRequests = photosData.map(({ photo_reference }) => (
          client.placePhoto({
            params: {
              photoreference: photo_reference,
              maxwidth: 400,
              key: apiKey,
            },
            timeout
          })
        ));
      }

      return Promise.all(photoRequests)
    })
    .then(photoResults => {
      business.photos = photoResults.map(result => (
        result.request._redirectable._currentUrl
      ));

      return new Promise(resolve => {
        resolve(business);
      });
    })
  });

  Promise.all(businessRequests)
    .then(businesses => {
      if (businesses.length !== newBusinessesJSON.length) {
        return console.log('something went wrong.');
      }

      console.log(newBusinessesJSON.length, businesses.length)

      const newFileData = JSON.stringify(updatedBusinessesJSON.concat(businesses), null, 2)

      fs.writeFile('updatedBusinesses.json', newFileData, (err) => {
        if (err) throw err;

        fs.writeFile('newBusinesses.json', JSON.stringify([], null, 4), (err) => {
          if (err) throw err;
          console.log('done');
        });
      });
    })
    .catch(error => console.log(error));
}

// getGoogleData();

// console.log(updatedBusinessesJSON.length)




// const fields = [
//   'name', 'phone', 'hours',
//   'menuId', 'isOpen', 'services',
// ];

// const newBusinessObjects = businessesJSON.businesses.map(business => {
//   const newData = {};

//   Object.keys(business).forEach(key => {
//     if (fields.includes(key)) {
//       newData[key] = business[key];
//     }
//   })

//   return newData;
// });

// console.log(newBusinessObjects);

// const newBusinessObjects = newBusinessesJSON.map(businessData => {
//   const splitMenuId = businessData.menuId.split('-');

//   let city = splitMenuId[splitMenuId.length - 1];
//   if (city === 'morris') {
//     city = 'mt ' + city;
//   }

//   return {
//     ...businessData,
//     city,
//   }
// });



// fs.writeFile('temp.json', JSON.stringify(newBusinessObjects, null, 2), (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });
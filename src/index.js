const http = require('got');

const API_URL = 'http://api.pigeon-staging.herokuapp.com/v1/deliveries';

module.exports = ({ publicKey, privateKey }) => {
  function deliver(messageIdentifier, parcels) {
    return http.post(API_URL, {
      headers: { 'X-Public-Key': publicKey, 'X-Private-Key': privateKey },
      body: JSON.stringify({
        message_identifier: messageIdentifier,
        parcels,
      }),
    });
  }

  return { deliver };
};

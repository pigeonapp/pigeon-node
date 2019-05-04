const http = require('got');

module.exports = ({ publicKey, privateKey }) => {
  function deliver(messageIdentifier, parcels) {
    return http.post(process.env.API_URL || 'https://api.pigeonapp.io/v1/deliveries', {
      headers: {
        'user-agent': 'pigeon-node-sdk',
        'X-Public-Key': publicKey,
        'X-Private-Key': privateKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message_identifier: messageIdentifier,
        parcels,
      }),
    });
  }

  return { deliver };
};

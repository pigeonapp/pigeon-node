const http = require('got');
const fs = require('fs');

const readFilePromised = attachment =>
  new Promise((resolve, reject) => {
    fs.readFile(attachment.file, (err, data) => {
      if (err) reject(err);
      resolve({
        file: Buffer.from(data).toString('base64'),
        name: attachment.name,
      });
    });
  });

const processAttachments = ({ attachments = [], ...otherParcels }) =>
  Promise.all(attachments.map(readFilePromised)).then(processedAttachments => ({
    attachments: processedAttachments,
    ...otherParcels,
  }));

module.exports = ({ publicKey, privateKey }) => {
  function deliver(messageIdentifier, parcels) {
    return processAttachments(parcels).then(processedParcels =>
      http.post(process.env.API_URL || 'https://api.pigeonapp.io/v1/deliveries', {
        headers: {
          'user-agent': 'pigeon-node-sdk',
          'X-Public-Key': publicKey,
          'X-Private-Key': privateKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_identifier: messageIdentifier,
          parcels: processedParcels,
        }),
      }),
    );
  }

  return { deliver };
};

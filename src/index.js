const http = require('got');
const fs = require('fs');

const readFilePromised = attachment =>
  new Promise((resolve, reject) => {
    fs.readFile(attachment.file, (err, data) => {
      if (err) reject(err);
      resolve({
        content: Buffer.from(data).toString('base64'),
        name: attachment.name,
      });
    });
  });

const processAttachments = ({ attachments = [], ...otherParcels }) =>
  Promise.all(attachments.map(readFilePromised)).then(processedAttachments => ({
    attachments: processedAttachments,
    ...otherParcels,
  }));

const createClient = ({
  baseUri = process.env.PIGEON_BASE_URI || 'https://api.pigeonapp.io/v1',
  publicKey = process.env.PIGEON_PUBLIC_KEY,
  privateKey = process.env.PIGEON_PRIVATE_KEY,
}) => {
  function deliver(messageIdentifier, parcels) {
    const multipleParcels = Array.isArray(parcels) ? parcels : [parcels];
    return Promise.all(multipleParcels.map(parcel => processAttachments(parcel))).then(finalParcels =>
      http.post(`${baseUri}/deliveries`, {
        headers: {
          'User-Agent': 'pigeon-node',
          'X-Public-Key': publicKey,
          'X-Private-Key': privateKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_identifier: messageIdentifier,
          parcels: finalParcels,
        }),
      }),
    );
  }

  return { deliver };
};

module.exports = {
  createClient,
};

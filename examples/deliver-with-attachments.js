/* eslint-disable no-console */
const Pigeon = require('..');

const pigeon = Pigeon.createClient();

async function main(){
  await pigeon.deliver('welcome-to-pigeon', {
    to: 'jane@example.com',
    attachments: [
      {
        file: `${__dirname}/../.eslintrc`,
        name: 'eslint',
      },
    ],
  })
  .then(() => console.log('Message Sent Successfully'))
  .catch(e => console.log(e.statusMessage));
}

main()

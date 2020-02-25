/* eslint-disable no-console */
const Pigeon = require('..')

const pigeon = Pigeon.createClient();

async function main(){
  await pigeon.deliver('confirmation-mail', { to: 'jane@example.com' })
  .then(() => console.log('Message Sent Successfully'))
  .catch(e => console.log(e.statusMessage));

  await pigeon.deliver('transfer-ownership', {
    to: 'John Doe <john@example.com>',
    cc: ['admin@example.com', 'client@example.com'],
  })
  .then(() => console.log('Message Sent Successfully'))
  .catch(e => console.log(e.statusMessage));
}

main()

import test from 'ava';
import { createClient } from '../src/index';

const Pigeon = createClient();

test.beforeEach(_t => {
  require('./fixtures/deliveries')();
});

test('Should send mail without attachments', async t => {
  await Pigeon.deliver('confirmation-mail', { to: 'rajat@keepworks.com' }).then(() => {
    t.pass();
  });
});

test('Should send mail with attachments', async t => {
  await Pigeon.deliver('invitation-mail-new-user', {
    to: 'rajat@keepworks.com',
    attachments: [
      {
        file: `${__dirname}/../.eslintrc`,
        name: 'eslint',
      },
    ],
  }).then(() => {
    t.pass();
  });
});

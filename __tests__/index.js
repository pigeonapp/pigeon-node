import test from 'ava';
import pigeon from '../src/index';

const Pigeon = pigeon({ publicKey: '55oepunmrLU8DCbcPsjCrkdf', privateKey: 'VTpFahdeEP3d1eBtJKFjXCX2nk2t4knG' });

process.env.API_URL = 'https://pigeon-api-staging.herokuapp.com/v1/deliveries';

test('Should send mail without attachments', async t => {
  await Pigeon.deliver('confirmation-mail', { to: 'rajat@keepworks.com' }).then(() => {
    // console.log(result.body);
    t.pass();
  });
});

test('Should send mail with attachments', async t => {
  await Pigeon.deliver('invitation-mail-new-user', {
    to: 'rajat@keepworks.com',
    attachments: [
      {
        file: __dirname + '/../.eslintrc',
        name: 'eslint',
      },
    ],
  }).then(() => {
    // console.log(result.body);
    t.pass();
  });
});

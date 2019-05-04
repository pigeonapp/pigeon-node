import test from 'ava';
import pigeon from '../src/index';

const Pigeon = pigeon({ publicKey: '55oepunmrLU8DCbcPsjCrkdf', privateKey: 'VTpFahdeEP3d1eBtJKFjXCX2nk2t4knG' });

test('Should send mail without attachments', async t => {
  await Pigeon.deliver('confirmation-mail', { to: 'lunasunkaiser@gmail.com' }).then(_ => t.pass());
});

const nock = require('nock');

module.exports = () =>
  nock('https://api.pigeonapp.io/v1')
    .post('/deliveries')
    .reply(200, {
      delivery: {
        id: 20,
        project_id: 1,
        message_id: 2,
        data: null,
        status: 'pending',
        report: null,
        created_at: '2019-05-05T14:49:23.249Z',
        updated_at: '2019-05-05T14:49:23.249Z',
      },
    });

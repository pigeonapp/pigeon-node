const Client = require('./Client');

const createClient = params => new Client(params);

module.exports = {
  createClient,
};

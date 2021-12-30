'use strict';

module.exports = (server) => {
  const handlers = require('./handlers')(server);
  return [
    // Get product list
    {
      method: 'POST',
      path: '/elevania/import',
      config: {
        description: 'Import product from Elevania',
        tags: ['api', 'elevania']
      },
      handler: handlers.importProduct
    }
  ]
}
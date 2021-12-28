'use strict';

exports.plugin = {
    pkg: require('../../package.json'),
    name : 'client_routes',
    register: async (server, options) => {
        const Controllers = require('../controllers/web/client');
        server.route([
            {
                method: 'GET',
                path: '/app',
                config: Controllers.index
            }
        ]);
    }
};

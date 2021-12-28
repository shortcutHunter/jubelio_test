'use strict';

exports.plugin = {
    pkg: require('../../package.json'),
    name : 'core_routes',
    register: async (server, options) => {
        const Controllers = {
            core: {
                static: require('../controllers/web/static')
            }
        };
        server.route([
            {
                method: 'GET',
                path: '/css/{path*}',
                config: {
                    auth: false
                },
                handler: Controllers.core.static.css
            },
            {
                method: 'GET',
                path: '/images/{path*}',
                config: {
                    auth: false
                },
                handler: Controllers.core.static.img
            },
            {
                method: 'GET',
                path: '/js/{path*}',
                config: {
                    auth: false
                },
                handler: Controllers.core.static.js
            },
            {
                method: 'GET',
                path: '/favicon.ico',
                config: {
                    auth: false
                },
                handler: Controllers.core.static.favicon
            }
        ]);
    }
};

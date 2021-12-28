'use strict';

const env = process.env;

exports.data = {
    server: {
        port: env.SERVER_PORT,
        host: env.SERVER_HOST
    },
    register: {
        plugins: [
            {
                plugin: 'inert'
            },
            {
                plugin: 'vision'
            },
            {
                plugin: require('hapi-postgres-connection')
            },
            {
                plugin: './app/routes/core.js'
            },
            {
                plugin: './app/routes/product.js'
            },
            {
                plugin: './app/routes/client.js'
            }
        ]
    }
};
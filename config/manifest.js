'use strict';

const env = process.env;

const manifest = {
    server: {
        host: (process.env.PORT) ? '0.0.0.0' : 'localhost',
        port: (process.env.PORT || 8080),
    },
    register: {
        plugins: [
            { plugin: 'inert' },
            { plugin: 'vision' },
            { plugin: 'hapi-postgres-connection' },
            {
                plugin: './modules/products'
            },
            {
                plugin: './modules/elevania'
            }
        ]
    }
}

module.exports = manifest
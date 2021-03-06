'use strict';

// dotenv must be at top. (dotenv read .env file)
const dotenv = require('dotenv');
dotenv.config();

const Glue = require('@hapi/glue');
const manifest = require('./config/manifest');
const Handlebars = require('handlebars');

const composeOptions = {
    relativeTo: __dirname
};

const startServer = async function () {
    try {
        const server = await Glue.compose(manifest, composeOptions);
        await server.start();
        server.views({
            engines: {
                hbs: Handlebars
            },
            path: './client/build'
        });
        console.info(`Server started at ${ server.info.uri }`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
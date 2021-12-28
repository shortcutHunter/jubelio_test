'use strict';

exports.css = {
    directory: {
        path: 'assets/css'
    }
};

exports.img = {
    directory: {
        path: 'assets/images'
    }
};

exports.js = {
    directory: {
        path: 'assets/js'
    }
};

exports.favicon = {
    file: 'assets/favicon.ico'
};

exports.heartbeat = {
    auth: false,
    handler: async (request, h) => {
        return 'ok';
    }
};

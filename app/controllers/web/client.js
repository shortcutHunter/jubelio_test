'use strict';

const index = {
    description: 'View',
    auth: false,
    handler: async (request, reply) => {
        return reply.view('index');
    },
    tags: ['Web'] // swagger documentation
}

exports.index = index;
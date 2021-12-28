'use strict';

exports.plugin = {
    pkg: require('../../package.json'),
    name : 'product_api_routes',
    register: async (server, options) => {
        const Controllers = require('../controllers/api/product');
        server.route([
            {
                method: 'GET',
                path: '/product',
                config: Controllers.product.productList
            }
        ]);

        server.route([
            {
                method: 'POST',
                path: '/product',
                config: Controllers.product.productCreate
            }
        ]);

        server.route([
            {
                method: 'PUT',
                path: '/product/{product}',
                config: Controllers.product.productUpdate
            }
        ]);
        
        server.route([
            {
                method: 'DELETE',
                path: '/product/{product}',
                config: Controllers.product.productDelete
            }
        ]);
        
        server.route([
            {
                method: 'POST',
                path: '/fetch/elevania',
                config: Controllers.product.fetchElevania
            }
        ]);
    }
};

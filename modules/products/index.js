'use strict';

const register = async (server, options) => {
  
    server.register(require('./api'));
    server.register(require('./services'));
};
  
const products = {
    pkg: require('./package.json'),
    register: register,
    name: 'products'
};
  
exports.plugin = products;
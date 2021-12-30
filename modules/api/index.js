'use strict';

const register = async (server, options) => {
  
    server.register(require('./products'));
};
  
const api = {
    pkg: require('./package.json'),
    register: register,
    name: 'api'
};
  
exports.plugin = api;
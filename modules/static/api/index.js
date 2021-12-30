'use strict';

const Routes = require('./routes');

const register = async (server, options) => {
  
    server.route(Routes(server));
};
  
const static_api = {
    pkg: require('./package.json'),
    register: register,
    name: 'static_api'
};
  
exports.plugin = static_api;
'use strict';

const Routes = require('./routes');

const register = async (server, options) => {
  
    server.route(Routes(server));
};
  
const api = {
    pkg: require('./package.json'),
    register: register,
    name: 'api'
};
  
exports.plugin = api;
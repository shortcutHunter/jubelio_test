'use strict';

const Routes = require('./routes');

const register = async (server, options) => {
  
    server.route(Routes(server));
};
  
const elevania_api = {
    pkg: require('./package.json'),
    register: register,
    name: 'elevania_api'
};
  
exports.plugin = elevania_api;
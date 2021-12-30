'use strict';

const register = async (server, options) => {
  
    server.register(require('./api'));
};
  
const staticFile = {
    pkg: require('./package.json'),
    register: register,
    name: 'staticFile'
};
  
exports.plugin = staticFile;
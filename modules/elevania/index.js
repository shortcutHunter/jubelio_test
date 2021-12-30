'use strict';

const register = async (server, options) => {
  
    server.register(require('./api'));
    server.register(require('./services'));
};
  
const elevania = {
    pkg: require('./package.json'),
    register: register,
    name: 'elevania'
};
  
exports.plugin = elevania;
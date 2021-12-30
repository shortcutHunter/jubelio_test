'use strict';

const register = async (server, options) => {
    let services = [].concat(
      require('./products')
    );
    server.method(services);
  }
  
const services = {
  pkg: require('./package.json'),
  register: register,
  name: 'services'
}

  exports.plugin = services
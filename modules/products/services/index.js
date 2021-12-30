'use strict';

const register = async (server, options) => {
    let services = [].concat(
      require('./products')
    );
    server.method(services);
  }
  
const product_services = {
  pkg: require('./package.json'),
  register: register,
  name: 'product_services'
}

  exports.plugin = product_services
'use strict';

const register = async (server, options) => {
    let services = [].concat(
      require('./elevania')
    );
    server.method(services);
  }
  
const elevania_services = {
  pkg: require('./package.json'),
  register: register,
  name: 'elevania_services'
}

  exports.plugin = elevania_services
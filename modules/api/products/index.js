'use strict';

const Routes = require('./routes');

const register = async (server, options) => {

  server.route(Routes(server));
}

register.attributes = {
  pkg: require('./package.json')
}

const products = {
  pkg: require('./package.json'),
  register: register,
  name: 'products'
};

exports.plugin = products;
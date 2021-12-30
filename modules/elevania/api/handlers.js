'use strict';

module.exports = (server) => {
    
  return {
    /**
     * POST /elevania/import
     * @param {*} request
     * @param {*} reply
     */
     async importProduct (request, reply) {
      let callbackFunction = (err, elevania) => {

        if (err) {
          return reply.response(err).code(422);
        }else{
          return reply.response('Ok');
        }
      };
      let products = server.methods.services.products;
      let product_list = await server.methods.services.elevania.getProduct();

      return products.importData(product_list, callbackFunction);
    }
  }
}
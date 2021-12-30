'use strict';

module.exports = (server) => {
    
  return {
    /**
     * GET /api/product
     * @param {*} request
     * @param {*} reply
     */
     async getProductList (request, reply) {
      let offset = request.query.offset || 0;
      let callbackFunction = (err, productList) => {

        if (err) {
          return reply.response(err).code(422);
        }else{
          return reply.response(productList.rows);
        }
      };
      let getProductList = await server.methods.services.products.getProductList(offset, callbackFunction);
      return getProductList;
    },

    /**
     * POST /api/product/{productId}
     * @param {*} request
     * @param {*} reply
     */
    updateProduct (request, reply) {
      let payload = request.payload;
      let productId = request.params.productId;
      let callbackFunction = (err, updatedProduct) => {
        
        if (err) {
          return reply.response(err).code(422);
        }else{
          return reply.response(updatedProduct.rows[0]);
        }
      };

      return server.methods.services.products.updateProduct(productId, payload, callbackFunction);
    },

    /**
     * POST /api/product
     * @param {*} request
     * @param {*} reply
     */
    createProduct (request, reply) {
      let payload = request.payload;

      return server.methods.services.products.createProduct(payload, (err, product) => {

        if (err) {
          return reply.response(err).code(422);
        } else {
          return reply.response(product.rows[0]);
        }
      });
    },
    /**
     * DELETE /api/product/{productId}
     * @param {*} request
     * @param {*} reply
     */
     deleteProduct (request, reply) {
      let productId = request.params.productId;

      return server.methods.services.products.deleteProduct(productId, (err, result) => {

        if (err) {
            return reply.response(err).code(422);
        } else {
            return reply.response(result);
        };        
      });
    }

  }
}
'use strict';

module.exports = (server) => {
  const handlers = require('./handlers')(server)
  return [
    // Get product list
    {
      method: 'GET',
      path: '/product',
      config: {
        description: 'Get the product list',
        tags: ['api', 'products']
      },
      handler: handlers.getProductList
    },
    // Update product
    {
      method: 'PUT',
      path: '/product/{productId}',
      config: {
        description: 'Update product',
        tags: ['api', 'products']
      },
      handler: handlers.updateProduct
    },
    // Create product
    {
      method: 'POST',
      path: '/product',
      config: {
        description: 'Create a product',
        tags: ['api', 'products']
      },
      handler: handlers.createProduct
    },
    // Delete product
    {
      method: 'DELETE',
      path: '/product/{productId}',
      config: {
        description: 'Delete Product',
        tags: ['api', 'products']
      },
      handler: handlers.deleteProduct
    }
  ]
}
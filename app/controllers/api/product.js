'use strict';

const Product = require('../../models/product').Product;
const axios = require('axios');
const Elevania = require('../../models/elevania').Elevania;

const getProductField = function(payload) {
    let product_value = {
        name: payload.name,
        sku: payload.sku,
        image: payload.image,
        price: payload.price,
        description: payload.description
    };

    return product_value;
};

const handleOperation = function(result, reply) {
    if (result) {
        return reply.response({
            status: 'success'
        });
    }
    return reply.response({
        status: 'failed'
    }).code(401);
}

const productList = {
    description: 'Product list api',
    auth: false,
    handler: async (request, reply) => {

        try {
            let product = new Product(request.pg.client);
            let product_list = await product.all(request.query.offset || 0);
            return reply.response({
                status : 'success',
                data: product_list.rows
            });
        } catch (error) {
            return error.message;
        }
    },
    tags: ['api'] // swagger documentation
};

const productCreate = {
    description: 'Create product api',
    auth: false,
    handler: async (request, reply) => {

        try {
            let product = new Product(request.pg.client);
            let product_value = getProductField(request.payload);
            let create_product = await product.create(product_value);

            return handleOperation(create_product, reply);
        } catch (error) {
            return error.message;
        }
    },
    tags: ['api'] // swagger documentation
}

const productUpdate = {
    description: 'Update product api',
    auth: false,
    handler: async (request, reply) => {

        try {
            let product = new Product(request.pg.client);
            let product_value = getProductField(request.payload);
            let update_product = await product.update(product_value, request.params.product);

            return handleOperation(update_product, reply);
        } catch (error) {
            return error.message;
        }
    },
    tags: ['api'] // swagger documentation
}

const productDelete = {
    description: 'Delete product api',
    auth: false,
    handler: async (request, reply) => {

        try {
            let product = new Product(request.pg.client);
            let delete_product = product.delete(request.params.product);

            return handleOperation(delete_product, reply);
        } catch (error) {
            return error.message;
        }
    },
    tags: ['api'] // swagger documentation
}

const fetchElevania = {
    description: 'Import product from Elevania',
    auth: false,
    handler: async (request, reply) => {

        try {
            let product = new Product(request.pg.client);
            let elevania = new Elevania();
            let product_list = await elevania.getProduct();
            let import_product = product.import(product_list);

            return handleOperation(import_product, reply);
        } catch (error) {
            return error.message;
        }
    },
    tags: ['api'] // swagger documentation
}


exports.product = {
    productList: productList,
    productCreate: productCreate,
    productUpdate: productUpdate,
    productDelete: productDelete,
    fetchElevania: fetchElevania
};
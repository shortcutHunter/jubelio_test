'user strict';

const pg = require('hapi-postgres-connection').getCon();

const table_name = "product";
const limit = 8;

const getProductField = function (payload) {
    let product_value = {
        name: payload.name,
        sku: payload.sku,
        image: payload.image,
        price: payload.price,
        description: payload.description
    };

    return product_value;
};

const executeQuery = function (query, statement, callback) {
    return pg.then(con => {
        return con.client.query(query, statement)
            .then(result => callback(false, result))
            .catch(e => callback(e.stack, false));
    });
}

function getProductList (offset, callback) {
    let query = `SELECT * FROM ${table_name} limit ${limit} offset $1`;
    return executeQuery(query, [offset], callback);
}

function updateProduct (productId, data, callback) {
    let productField = getProductField(data);
    let last_index = 1;
    
    let = fields = Object.keys(productField).map((value) => {

        let return_value = `${value}=$${last_index}`;
        last_index++;
        return return_value;
    });

    let value = Object.values(productField);
    value.push(productId);

    let query = `UPDATE ${table_name} set ${fields.join(', ')} WHERE id=$${last_index} RETURNING *`;
    return executeQuery(query, value, callback);
}

function createProduct (data, callback) {
    let productField = getProductField(data);
    let fields = Object.keys(productField);
    let prepare_statement = fields.map((value, index) => `$${index+1}`);

    let value = Object.values(productField);
    let query = `INSERT INTO ${table_name}(${fields.join(', ')}) VALUES(${prepare_statement}) RETURNING *`;
    return executeQuery(query, value, callback);
}

function deleteProduct (productId, callback) {
    let query = `DELETE FROM ${table_name} WHERE id=$1`;
    return executeQuery(query, [productId], callback);

}

module.exports = [
    {
        name: 'services.products.getProductList',
        method: getProductList
    },
    {
        name: 'services.products.updateProduct',
        method: updateProduct
    },
    {
        name: 'services.products.createProduct',
        method: createProduct
    },
    {
        name: 'services.products.deleteProduct',
        method: deleteProduct
    },
]
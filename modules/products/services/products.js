'user strict';

const pg = require('hapi-postgres-connection').getCon();

const table_name = "product";
const limit = 8;

function getProductField (payload) {
    let product_value = {
        name: payload.name,
        sku: payload.sku,
        image: payload.image,
        price: payload.price,
        description: payload.description
    };

    return product_value;
};

async function executeQuery (query, statement, callback) {
    return pg.then(con => {
        return con.client.query(query, statement)
            .then(result => callback(false, result))
            .catch(e => callback(e.stack, false));
    });
}

async function getProductList (offset, callback) {
    let query = `SELECT * FROM ${table_name} limit ${limit} offset $1`;
    return executeQuery(query, [offset], callback);
}

async function updateProduct (productId, data, callback) {
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

async function checkDuplicate (sku) {
    let callbackFunction = (err, product) => {

        if (err) {
            return false;
        } else {
            if (product.rows.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    }
    let query = `SELECT * FROM ${table_name} WHERE sku=$1`;
    return executeQuery(query, [sku], callbackFunction);
    
}

async function createProduct (data, callback) {
    let productField = getProductField(data);
    let fields = Object.keys(productField);
    let prepare_statement = fields.map((value, index) => `$${index+1}`);
    let isDuplicate = await checkDuplicate(data.sku);

    if (!isDuplicate) {
        let value = Object.values(productField);
        let query = `INSERT INTO ${table_name}(${fields.join(', ')}) VALUES(${prepare_statement}) RETURNING *`;
        return executeQuery(query, value, callback);
    } else {
        return callback("Sorry, sku cannot be duplicate", false);
    }
}

async function deleteProduct (productId, callback) {
    let query = `DELETE FROM ${table_name} WHERE id=$1`;
    return executeQuery(query, [productId], callback);

}

async function importData (products, callback) {

    let callbackFunction = (err, product) => {

        if (err) {
            return false;
        }else{
            return true;
        }
    };

    let result = await Promise.all(products.map(async (product) => {

        let product_value = {
            name: `${product.prdNm || null}`,
            sku: `${product.prdNo || null}`,
            image: `${product.detail ? product.detail.image : null}`,
            price: `${product.selPrc || null}`,
            description: `${product.detail ? product.detail.htmlDetail : null}`,
        };
        return createProduct(product_value, callbackFunction);
    }));

    return callback(false, result);
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
    {
        name: 'services.products.importData',
        method: importData
    },
]
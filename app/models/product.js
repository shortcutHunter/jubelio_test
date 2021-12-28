'use strict';

const Product = function (con) {
    this.con = con;
    this.tb_name = 'product';
    this.limit = 8;

    this.all = async (offset=0) => {
        return this.con.query(`SELECT * FROM ${this.tb_name} limit ${this.limit} offset ${offset}`);
    }

    this.check_duplicate = async (sku) => {
        let product = await this.con.query(`SELECT * FROM ${this.tb_name} WHERE sku='${sku}'`);
        if (product.rows.length > 0) {
            return true;
        }else{
            return false;
        }
    };

    this.create = async (data) => {
        let fields = ['name', 'sku', 'image', 'price', 'description'].join(',');
        let values = [
            data.name,
            data.sku,
            data.image,
            data.price,
            data.description,
        ];

        let is_duplicate = await this.check_duplicate(data.sku);

        if (!is_duplicate) {
            let query = `INSERT INTO ${this.tb_name}(${fields}) VALUES($1, $2, $3, $4, $5)`;
            return this.con.query(query, values);
        }else {
            return false;
        }
    }

    this.update = async (data, id) => {
        let fields = [
            `name='${data.name}'`,
            `sku='${data.sku}'`,
            `image='${data.image}'`,
            `price=${parseFloat(data.price)}`,
            `description='${data.description}'`
        ].join(',');
        let query = `UPDATE ${this.tb_name} SET ${fields} WHERE id='${id}'`;
        return this.con.query(query);
    }

    this.delete = async (id) => {
        return this.con.query(`DELETE FROM ${this.tb_name} WHERE id='${id}'`);
    }

    this.import = async (products) => {
        let self = this;
        products.forEach(function(product, i) {
            let product_value = {
                name: `${product.prdNm || null}`,
                sku: `${product.prdNo || null}`,
                image: `${product.detail ? product.detail.image : null}`,
                price: `${product.selPrc || null}`,
                description: `${product.detail ? product.detail.htmlDetail : null}`,
            };
            self.create(product_value);
        });

        return true;

    }
};

exports.Product = Product;
'use strict';

const axios = require('axios');
const { XMLParser} = require('fast-xml-parser');

const Elevania = function () {
    
    this.api_key = '721407f393e84a28593374cc2b347a98';
    this.base_url = 'http://api.elevenia.co.id/rest';
    this.headers = {
        'openapikey': this.api_key
    };

    this.all = async () => {
        return this.con.query(`SELECT * FROM ${this.tb_name}`);
    }

    this.getProduct = async () => {
        let self = this;
        let url = `${this.base_url}/prodservices/product/listing`;
        let product_data = await axios.get(url, { headers: this.headers })
            .then(response => {
                const parser = new XMLParser();
                let jObj = parser.parse(response.data); // convert xml to js object
                return jObj;
            });
        
        product_data = product_data.Products.product;

        await Promise.all(product_data.map(async (value) => {
            value['detail'] = await self.getProductDetail(value.prdNo);
            return value;
        }));

        return product_data;
    }

    this.getProductDetail = async (product_number) => {
        let url = `${this.base_url}/prodservices/product/details/${product_number}`;
        let product_detail = await axios.get(url, { headers: this.headers })
            .then(response => {
                const parser = new XMLParser();
                let jObj = parser.parse(response.data); // convert xml to js object
                return jObj;
            });
        product_detail = product_detail.Product;
        product_detail['image'] = await this.getImage(product_detail['prdImage01']);

        return product_detail;
    }

    this.getImage = async (image_link) => {
        if (image_link) {
            try {
                return await axios.get(image_link, {
                    responseType: 'arraybuffer'
                })
                .then(response => "data:image/jpeg;base64, " + Buffer.from(response.data, 'binary').toString('base64'));
            } catch (error) {
                return null;
            }
        }else{
            return null;
        }
    }
};

exports.Elevania = Elevania;
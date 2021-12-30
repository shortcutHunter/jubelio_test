'user strict';

const axios = require('axios');
const { XMLParser} = require('fast-xml-parser');

async function fetchApi (api_endpoint) {
    let env = process.env;
    let url =`${env.BASE_URL}/${api_endpoint}`;
    let headers = {
        'openapikey': env.API_KEY
    };

    let result = await axios.get(url, { headers: headers })
    .then(response => {
        const parser = new XMLParser();
        let jObj = parser.parse(response.data); // convert xml to js object
        return jObj;
    });

    return result;
}

async function getImage (image_link) {
    if (image_link) {
        try {
            return await axios.get(image_link, {
                responseType: 'arraybuffer'
            })
            .then(response => {
                let base64 = Buffer.from(response.data, 'binary').toString('base64');
                return "data:image/jpeg;base64, " + base64;
            });
        } catch (error) {
            return null;
        }
    }else{
        return null;
    }
}

async function getProductDetail (product_number) {
    let api_endpoint = `prodservices/product/details/${product_number}`;
    let product_detail = await fetchApi(api_endpoint);
    product_detail = product_detail.Product;
    product_detail['image'] = await getImage(product_detail['prdImage01']);

    return product_detail;
}

async function getProduct () {
    let api_endpoint = 'prodservices/product/listing';
    let product_data = await fetchApi(api_endpoint);
    product_data = product_data.Products.product;

    await Promise.all(product_data.map(async (value) => {
        
        value['detail'] = await getProductDetail(value.prdNo);
        return value;
    }));

    return product_data;
}

module.exports = [
    {
        name: 'services.elevania.getProduct',
        method: getProduct
    }
]
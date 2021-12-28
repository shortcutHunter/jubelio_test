import axios from 'axios';
import { makeObservable, observable, runInAction, action } from 'mobx';

class Product {

    data = [];
    popup = false;
    productId = false;

    constructor () {
        makeObservable(this, {
            data: observable,
            popup: observable,
            productId: observable,
            deleteProduct: action,
            showPopup: action,
            closePopup: action,
            addProduct: action,
            updateProduct: action,
            fetchFromElevania: action,
        });
        runInAction(this.prefetchData);
    }

    showPopup = (productId=false) => {
        const productIndexAtId = this.data.findIndex((product) => product.id === productId);
        this.active_product = this.data[productIndexAtId];
        this.popup = true;
    }

    closePopup = () => {

        this.popup = false;
    }

    prefetchData = () => {

        let self = this;
        axios.get('/product')
        .then(function (response) {
            self.data = response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    deleteProduct = (productId) => {

        let self = this;
        axios.delete(`/product/${productId}`)
        .then(function (response) {
            let data = response.data;
            if (data.status === 'success') {
                // const productIndexAtId = self.data.findIndex((product) => product.id === productId);
                // if (productIndexAtId > -1) {
                //     self.data.splice(productIndexAtId, 1);
                // }
                self.prefetchData();
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    addProduct = (value) => {
        let self = this;
        return axios.post('/product', value)
        .then(function (response) {
            let data = response.data;
            if (data.status === 'success') {
                // self.data.push(value);
                self.prefetchData();
                return true;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    updateProduct = (value, productId) => {
        let self = this;
        return axios.put(`/product/${productId}`, value)
        .then(function (response) {
            let data = response.data;
            if (data.status === 'success') {
                self.prefetchData();
                // const productIndexAtId = self.data.findIndex((product) => product.id === productId);
                // if (productIndexAtId > -1) {
                //     self.data[productIndexAtId] = value;
                // }
                return true;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    fetchFromElevania = () => {
        let self = this;
        return axios.post('/fetch/elevania', {})
        .then(function (response) {
            let data = response.data;
            if (data.status === 'success') {
                self.prefetchData();
                return true;
            }
        });
    }

    fetchMore = () => {
        let self = this;
        let offset = self.data.length;
        if (offset > 1) {
            offset++;
        }
        return axios.get(`/product?offset=${offset}`, {})
        .then(function (response) {
            let data = response.data.data;
            data.forEach(element => {
                self.data.push(element);
            });
        });
    }
}

export default Product;
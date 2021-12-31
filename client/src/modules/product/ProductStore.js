import axios from 'axios';
import { makeObservable, observable, runInAction, action } from 'mobx';

class ProductStore {

    data = [];
    popup = false;
    isLoading = false;
    productId = false;
    active_product = {
        id: null,
        name: null,
        sku: null,
        image: null,
        price: null,
        description: null
    };

    constructor () {
        makeObservable(this, {
            data: observable,
            popup: observable,
            productId: observable,
            isLoading: observable,
            deleteProduct: action,
            showPopup: action,
            closePopup: action,
            addProduct: action,
            updateProduct: action,
            fetchFromElevania: action,
            showLoading: action,
            hideLoading: action,
        });
        runInAction(this.prefetchData);
    }

    showLoading = () => {
        this.isLoading = true;
    }
    
    hideLoading = () => {
        this.isLoading = false;
    }

    showPopup = (productId=false) => {
        const productIndexAtId = this.data.findIndex((product) => product.id === productId);
        if (productIndexAtId !== -1) {
            this.active_product = this.data[productIndexAtId];
        }else {
            this.active_product = {
                id: null,
                name: null,
                sku: null,
                image: null,
                price: null,
                description: null
            };
        }
        this.popup = true;
    }

    findById = (productId) => {
        const productIndexAtId = this.data.findIndex((product) => product.id === productId);
        return productIndexAtId;
    }

    closePopup = () => {

        this.popup = false;
    }

    prefetchData = () => {

        let self = this;
        self.showLoading();
        axios.get('/product')
        .then(function (response) {
            self.data = response.data;
            self.hideLoading();
        })
        .catch(function (error) {
            console.log(error);
            self.hideLoading();
        });
    };

    deleteProduct = (productId) => {

        let self = this;
        self.showLoading();
        axios.delete(`/product/${productId}`)
        .then(function (response) {
            const productIndexAtId = self.findById(productId);
            if (productIndexAtId > -1) {
                self.data.splice(productIndexAtId, 1);
            }
            self.hideLoading();
            return true;
        }).catch(function (error) {
            console.log(error);
            self.hideLoading();
        });
    };

    addProduct = (value) => {
        let self = this;
        self.showLoading();
        return axios.post('/product', value)
        .then(function (response) {
            self.prefetchData();
            self.closePopup();
            self.hideLoading();
            return true;
        })
        .catch(function (error) {
            console.log(error);
            self.hideLoading();
        });
    }

    updateProduct = (value, productId) => {
        let self = this;
        self.showLoading();
        return axios.put(`/product/${productId}`, value)
        .then(function (response) {
            let data = response.data;
            const productIndexAtId = self.data.findIndex((product) => product.id === productId);
            if (productIndexAtId > -1) {
                self.data[productIndexAtId] = data;
            }
            self.hideLoading();
            return true;
        })
        .catch(function (error) {
            console.log(error);
            self.hideLoading();
        });
    }

    fetchFromElevania = () => {
        let self = this;
        self.showLoading();
        return axios.post('/elevania/import', {})
        .then(function (response) {
            self.fetchMore();
            self.hideLoading();
            return true;
        });
    }

    fetchMore = () => {
        let self = this;
        let offset = self.data.length;
        if (offset > 1) {
            offset++;
        }
        self.showLoading();
        return axios.get(`/product?offset=${offset}`, {})
        .then(function (response) {
            let data = response.data;
            data.forEach(element => {
                self.data.push(element);
            });
            self.hideLoading();
        });
    }
}

export default ProductStore;
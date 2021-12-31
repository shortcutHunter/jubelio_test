import React from "react";
import { observer } from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Popup ({product}) {

    const getData = (field_name) => {

        if (product.active_product) {
            return product.active_product[field_name] || null;
        }else{
            return null;
        }
    };
    
    let name = null;
    let sku = null;
    let image = null;
    let price = null;
    let description = null;

    let defaultValue = {
        id: getData('id'),
        name: getData('name'),
        sku: getData('sku'),
        image: getData('image'),
        price: getData('price'),
        description: getData('description'),
    };

    const getBase64 = file => {
        return new Promise(resolve => {
          let baseURL = "";
          let reader = new FileReader();
    
          reader.readAsDataURL(file);
          reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
          };          
        });
    };

    const closePopupHandler = () => {
        product.closePopup();
    }
    const handleSubmit = async (e) => {
        let product_value = {
            name: name.value,
            sku: sku.value,
            price: price.value,
            description: description.value,
        };

        if (image.value) {
            await getBase64(image.files[0]).then((result)=> {
                product_value['image'] = result;
            });
        }
        
        if (product.active_product.id) {
            if (!product_value.image) {
                product_value.image = product.active_product.image;
            }

            product.updateProduct(product_value, product.active_product.id).then( (result) => {
                if (result) {
                    closePopupHandler();
                }
            });
        }else{
            product.addProduct(product_value).then( (result) => {
                if (result) {
                    closePopupHandler();
                }
            });
        }       
    } 

    return (
            <Modal show={product.popup} onHide={product.closePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.active_product.id ? "Edit" : "Add"} Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                        <div className="from-group">
                            <label>Name</label>
                            <input type="text" className="form-control" ref={node => {name = node}} defaultValue={defaultValue.name} />
                        </div>

                        <div className="from-group">
                            <label>SKU</label>
                            <input type="text" className="form-control" ref={node => {sku = node}} defaultValue={defaultValue.sku} />
                        </div>
                        
                        <div className="from-group">
                            <label>Images</label>
                            <input type="file" className="form-control" ref={node => {image = node}} />
                        </div>
                        
                        <div className="from-group">
                            <label>Price</label>
                            <input type="text" className="form-control" ref={node => {price = node}} defaultValue={defaultValue.price} />
                        </div>
                        
                        <div className="from-group">
                            <label>Description</label>
                            <textarea type="file" className="form-control" ref={node => {description = node}} defaultValue={defaultValue.description} />
                        </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
    );
}

export default observer(Popup);
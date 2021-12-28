import React from "react";
import { observer } from "mobx-react-lite";

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
            // let file_detail = file;
            // file_detail['base64'] = baseURL;
            resolve(baseURL);
          };          
        });
    };

    const closePopupHandler = () => {
        product.closePopup();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
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
        
        if (defaultValue.id) {
            if (!product_value.image) {
                product_value.image = defaultValue.image;
            }

            product.updateProduct(product_value, defaultValue.id).then( (result) => {
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
        <div className="popup">
             <div className="popup-content">
                 <span className="close" onClick={closePopupHandler}>&times;</span>
                 <br />
                 <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="from-group">
                        <label>Name</label>
                        <input type="text" id={'name'} defaultValue={defaultValue.name} className="form-control" ref={node => {
                            name = node;
                        }} />
                    </div>

                    <div className="from-group">
                        <label>SKU</label>
                        <input type="text" id={'sku'} defaultValue={defaultValue.sku} className="form-control" ref={node => {
                            sku = node;
                        }} />
                    </div>
                    
                    <div className="from-group">
                        <label>Images</label>
                        <input type="file" id={'image'} className="form-control" ref={node => {
                            image = node;
                        }} />
                    </div>
                    
                    <div className="from-group">
                        <label>Price</label>
                        <input type="text" id={'price'} defaultValue={defaultValue.price} className="form-control" ref={node => {
                            price = node;
                        }} />
                    </div>
                    
                    <div className="from-group">
                        <label>Description</label>
                        <textarea type="file" id={'description'} defaultValue={defaultValue.description} className="form-control" ref={node => {
                            description = node;
                        }} />
                    </div>
                    
                    <button type="submit" className="submit-button">Submit</button>
                </form>
             </div>
       </div>
    );
}

export default observer(Popup);
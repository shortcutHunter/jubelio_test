import React from "react";
import { observer } from "mobx-react-lite";
import Popup from "../components/Popup";

function AddItem ({ product }) {

    const openPopupHandler = () => {
        product.showPopup();
    };

    const fetchFromElevania = () => {
        product.fetchFromElevania();
    };
      
    return (
        <div>
            <div className="button-container">
                <button onClick={openPopupHandler} style={{ 'marginRight': '10px' }}> Add Product </button>
                <button onClick={fetchFromElevania}> Fetch From Elevania </button>
            </div>
            {
                product.popup &&
                <Popup product={product} />
            }
        </div>
    );
};

export default observer(AddItem);
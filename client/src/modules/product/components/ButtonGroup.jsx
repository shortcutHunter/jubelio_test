import React from "react";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";

function ButtonGroup ({ product }) {

    const openPopupHandler = () => {
        product.showPopup();
    };

    const fetchFromElevania = () => {
        product.fetchFromElevania();
    };
      
    return (
        <div>
            <div className="button-container" style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                <Button onClick={openPopupHandler} style={{ 'marginRight': '10px' }}> Add Product </Button>
                <Button onClick={fetchFromElevania}> Import From Elevania </Button>
            </div>
        </div>
    );
};

export default observer(ButtonGroup);
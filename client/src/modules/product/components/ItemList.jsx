import React from "react";
import { observer } from "mobx-react-lite";

function ItemList ({product}) {

    const handleDeleteProduct = (p) => {
        product.deleteProduct(p.id);
    };

    const handleEditProduct = (p) => {
        product.showPopup(p.id);
    }

    const handleScroll = (event) => {
        var node = event.target;
        const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
        if (bottom) {
            product.fetchMore();
        }
    }

    return (
        <div className='card-container' onScroll={handleScroll}>
            {
                product.data.length === 0 &&
                <div>No data at the moment</div>
            }
            {product.data.map((p) => {
                return (
                    <div className='card'>
                        <div className="card-image">
                            <img src={p.image} alt="" />
                        </div>
                        <div className='card-title'>
                            {p.name}
                        </div>
                        <div className='card-body'>
                            <div className='card-info'>SKU: {p.sku}</div>
                            <div className='card-info'>Price: {p.price}</div>
                            <div className='card-info'>
                                Description:
                                <div dangerouslySetInnerHTML={{__html: p.description}}></div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button onClick={() => handleEditProduct(p)} className="edit-button">
                                Edit
                            </button>
                            <button onClick={() => handleDeleteProduct(p)}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default observer(ItemList);
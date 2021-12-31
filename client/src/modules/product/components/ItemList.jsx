import React from "react";
import { observer } from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
                    <Card style={{ width: '18rem', marginRight: '20px', marginBottom: "20px" }}>
                        <Card.Img variant="top" src={p.image} />
                        <Card.Body>
                            <Card.Title>{p.name}</Card.Title>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>SKU</td>
                                        <td>:</td>
                                        <td>{p.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Price</td>
                                        <td>:</td>
                                        <td>{p.price}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>:</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='card-desc'>
                                <div dangerouslySetInnerHTML={{__html: p.description}}></div>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={() => handleEditProduct(p)} style={{ marginRight: '10px' }}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteProduct(p)}>
                                Delete
                            </Button>
                        </Card.Footer>
                    </Card>
                );
            })}
        </div>
    );
}

export default observer(ItemList);
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import './Loading.css';
import { observer } from "mobx-react-lite";

function Loading ({product}) {

    return (
        <>
            {
                product.isLoading &&
                <div className="loading-container">
                    <Spinner animation="border"/>
                </div>
            }

        </>
    );
}

export default observer(Loading);
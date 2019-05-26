import React from 'react';
import './ProductItem.css'

const ProductItem = (props) => (
    <li className="productItem__wrapper">
        <div>
            <p className="productItem__name">{props.name}</p><p className="productItem__quantity">{props.quantity}, {props.type}</p>
        </div>
    </li>
);

export default ProductItem;
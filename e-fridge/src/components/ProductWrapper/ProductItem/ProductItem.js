import React from 'react';

const ProductItem = (props) => (<>
        <tbody>
        <tr>
            <td>{props.name}</td>
            <td>{props.quantity}</td>
            <td>{props.type}</td>
        </tr>
        </tbody>
    </>
);

export default ProductItem;
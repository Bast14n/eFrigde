import React from 'react';

const ProductItem = (props) => (<>
        <tbody>
        <tr>
            <td>{props.name}</td>
            <td>{props.quantity}</td>
            <td>{props.type}</td>
        </tr>
        </tbody>
        {/*<ul className="list-group">*/}
        {/*    <li className="list-group-item">*/}
        {/*        <p>{props.name}</p>*/}
        {/*        <p>{props.quantity}, {props.type}</p>*/}
        {/*    </li>*/}
        {/*</ul>*/}
    </>
);

export default ProductItem;
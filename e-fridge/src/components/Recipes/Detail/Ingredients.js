import React from 'react';

const Ingredients = (props) => (
    <li>
        <div>
            <p className="">{props.name}, {props.quantity}, {props.type}</p>
        </div>
    </li>
)
export default Ingredients;
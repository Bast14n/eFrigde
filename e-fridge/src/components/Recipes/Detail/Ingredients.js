import React from 'react';
import './Ingredients.css';

const Ingredients = (props) => (
    <li>
        <div>
            <p className="">{props.name}, {props.quantity}, {props.type}</p>
        </div>
    </li>
)
export default Ingredients;
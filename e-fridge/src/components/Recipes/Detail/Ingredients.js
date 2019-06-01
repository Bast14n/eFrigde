import React from 'react';
import './Ingredients.css';

const Ingredients = (props) => (
        <div>
            <p className="">{props.name}, {props.quantity}, {props.type}</p>
        </div>
)
export default Ingredients;
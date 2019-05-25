import React, {useState} from 'react';
import ProductItem from './ProductItem/ProductItem';
import Product from './ProductItem/ProductModel';

const Fridge = [];


class ProductWrapper extends React.Component {

    render() {
        return (<div>
            <form>
                <div>
                    <input type="text" id="name" placeholder="Nazwa produktu" required/>
                    <input id="quantity" placeholder="ilość" required/>
                    <button onClick={event => {
                        event.preventDefault();
                        const name = document.getElementById("name").value;
                        const quantity = document.getElementById('quantity').value;
                        Fridge.push({name:name,quantity:quantity});
                        this.forceUpdate();
                    }
                    }>Dodaj produkt
                    </button>
                </div>
            </form>
            <ul>
                {
                    Fridge.map(
                        (product, index) => (
                            <ProductItem key={index} {...product}/>
                        )
                    )
                }
            </ul>
        </div>)
    };
}

export default ProductWrapper;
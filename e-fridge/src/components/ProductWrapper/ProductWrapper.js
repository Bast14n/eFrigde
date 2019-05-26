import React from 'react';
import ProductItem from './ProductItem/ProductItem';


class ProductWrapper extends React.Component {
    state = {
        fridge: [],
        products: [
            {
                id: 1,
                name: "Parówka",
                type: "sztuka"
            },
            {
                id: 2,
                name: "Pieczarka",
                type: "gram"
            },

            {
                id: 3,
                name: "Cebula",
                type: "sztuka"
            },
            {
                id: 4,
                name: "Pomidor",
                type: "sztuka"
            },
            {
                id: 5,
                name: "Czosnek",
                type: "ząbek"
            },
            {
                id: 6,
                name: "Ryż",
                type: "opakowanie"
            },
            {
                id: 7,
                name: "Papryka",
                type: "sztuka"
            },

        ],
    };

    render() {
        return (<>
            <h1 className="productWrapper__header">Lodówka</h1>
            <form>
                <div className="productWrapper__wrapper">
                    <select type="text" id="name" className="productWrapper__name">
                        {
                            this.state.products.map(product => (
                                <option value={product.name} key={product.id}>{product.name}, {product.type}</option>
                            ))
                        }
                    </select>
                    <input id="quantity" placeholder="ilość" className="productWrapper__quantity"/>
                    <button onClick={event => {
                        event.preventDefault();
                        const name = document.getElementById("name").value;
                        const quantity = document.getElementById('quantity').value;
                        if (/^\d+$/.test(quantity) === false) {
                            alert('podano złe dane');
                            return;
                        }
                        const indexOfProduct = this.state.fridge.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
                        console.log(indexOfProduct);
                        if (indexOfProduct === -1) {
                            this.setState({
                                fridge: [...this.state.fridge, {name: name, quantity: Number.parseInt(quantity)}]
                            });
                        }
                        else {
                            this.state.fridge[indexOfProduct].quantity += Number.parseInt(quantity);
                            this.forceUpdate()
                        }
                        document.getElementById('name').value = "";
                        document.getElementById('quantity').value = "";
                    }
                    } className="productWrapper__button"
                    >Dodaj produkt
                    </button>
                </div>
            </form>
            <ul>
                {
                    this.state.fridge.map(
                        (product, index) => (
                            <ProductItem key={index} {...product}/>
                        )
                    )
                }
            </ul>
        </>)
    };
}

export default ProductWrapper;
import React from 'react';
import ProductItem from './ProductItem/ProductItem';
import Products from './products'

class ProductWrapper extends React.Component {
    state = {
        fridge: [],
        products: Products,
    };

    render() {
        return (<>
            <h1 className="productWrapper__header">Lodówka</h1>
            <form>
                <div className="productWrapper__wrapper">
                    <select type="text" id="name" className="productWrapper__name">
                        <option disabled selected>Wybierz produkt</option>
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
                        if(name==='Wybierz produkt') return;
                        const indexInState = this.state.products.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
                        const id = this.state.products[indexInState].id;
                        const type = this.state.products[indexInState].type;
                        if (/^\d+$/.test(quantity) === false) {
                            alert('wybierz ilość');
                            return;
                        }
                        const indexOfProduct = this.state.fridge.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
                        if (indexOfProduct === -1) {
                            this.setState({
                                fridge: [...this.state.fridge, {id: id,name: name, quantity: Number.parseInt(quantity), type: type}]
                            });
                        }
                        else {
                            this.state.fridge[indexOfProduct].quantity += Number.parseInt(quantity);
                            this.forceUpdate()
                        }
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
                        (product) => (
                            <ProductItem key={product.id} {...product}/>
                        )
                    )
                }
            </ul>
        </>)
    };
}

export default ProductWrapper;
import React from 'react';
import ProductItem from './ProductItem/ProductItem';
import Products from './products'
import fire from '../../config/Fire';
import './ProductWrapper.css'

class ProductWrapper extends React.Component {
    state = {
        userId: localStorage.getItem('user'),
        fridge: [],
        products: Products,
    };

    constructor() {
        super();
        this.database = fire.database().ref(`fridge/userId/${this.state.userId}`);
    }

    getDataFromDatabase() {
        // if (this.state.userId === null) window.location.reload();
        this.database.on('value', (snapshot) => {
            let products = snapshot.val();
            let downloadedFridge = [];
            if (products === null) return;
            products.forEach(product => {
                downloadedFridge.push({
                    id: product.id,
                    name: product.name,
                    quantity: product.quantity,
                    type: product.type,
                })
            });
            this.setState({
                fridge: downloadedFridge
            });
        })
    }

    componentWillMount() {
        this.getDataFromDatabase();
    }

    render() {
        return (
            <>
                <h1>Rzeczy w Twojej lodówce:</h1>
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered table-dark">
                            <tbody className="text-success">
                            <tr>
                                <th scope="col">Nazwa produktu</th>
                                <th scope="col">Ilość</th>
                                <th scope="col">Jednostka</th>
                            </tr>
                            </tbody>
                            {
                                this.state.fridge.map(
                                    (product) => (
                                        <ProductItem key={product.id} {...product}/>
                                    )
                                )
                            }
                        </table>
                    </div>
                    <div className="row">
                        <form>


                            <div className="col-form-label">
                                <select type="text" id="name" className="form-control">
                                    <option disabled selected>Wybierz produkt</option>
                                    {
                                        this.state.products.map(product => (
                                            <option value={product.name}
                                                    key={product.id}>{product.name}, {product.type}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-form-label">
                                <input id="quantity" placeholder="ilość" className="form-control"/>
                            </div>
                            <div className="col-form-label">
                                <button className="btn btn-primary" onClick={event => {
                                    event.preventDefault();
                                    const name = document.getElementById("name").value;
                                    const quantity = document.getElementById('quantity').value;
                                    if (name === 'Wybierz produkt') return;
                                    const indexInState = this.state.products.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
                                    const id = this.state.products[indexInState].id;
                                    const type = this.state.products[indexInState].type;
                                    if (/^\d+$/.test(quantity) === false || quantity === 0) {
                                        alert('wybierz ilość');
                                        return;
                                    }
                                    const indexOfProduct = this.state.fridge.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
                                    if (indexOfProduct === -1) {
                                        this.state.fridge.push({
                                            id: id,
                                            name: name,
                                            quantity: Number.parseInt(quantity),
                                            type: type
                                        });
                                        this.forceUpdate();
                                        this.database.update(this.state.fridge)
                                    } else {
                                        this.state.fridge[indexOfProduct].quantity += Number.parseInt(quantity);
                                        this.forceUpdate();
                                        this.database.update(this.state.fridge);
                                    }
                                    document.getElementById('quantity').value = "";
                                }
                                }
                                >Dodaj produkt
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>)
    };
}

export default ProductWrapper;
import React from 'react';
import './AddProduct.css';
import firebase from "./App";
import fire from './config/Fire';
import Products from "./components/ProductWrapper/products";

class AddProduct extends React.Component {
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
            <div className="">
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
        )

    }
}


export default AddProduct;
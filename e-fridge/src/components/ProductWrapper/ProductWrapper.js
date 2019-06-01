import React from 'react';
import ProductItem from './ProductItem/ProductItem';
import Products from './products';
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
        if (this.state.userId === null) window.location.reload();
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

                </div>
            </>)
    };
}

export default ProductWrapper;
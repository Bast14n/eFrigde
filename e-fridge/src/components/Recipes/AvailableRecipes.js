import React from "react";
import axios from 'axios';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import RecipesDetail from './Detail/RecipesDetail';
import Products from "../ProductWrapper/products";
import fire from "../../config/Fire";

class AvailableRecipes extends React.Component {
    state = {
        userId: localStorage.getItem('user'),
        fridge: [],
        products: Products,
        recipes: [
            {
                id: 0,
                name: ''
            }
        ]
    };

    constructor(props) {
        super(props);

        this.database = fire.database().ref(`fridge/userId/${this.state.userId}`);
        // this.database = fire.database().ref(`fridge/userId/Bx9HFzhuvOWPxgNgi2GMXYEfXLj1`);

        console.log('user id:' + this.userId);
    }

    getDataFromDatabase() {
        if (this.state.userId === null) window.location.reload();
        this.database.on('value', (snapshot) => {
            let products = snapshot.val();
            let downloadedFridge = [];
            if (products === null) return;
            products.forEach(product => {
                    console.log(product);
                    downloadedFridge.push({
                        id: product.id,
                        name: product.name,
                        quantity: product.quantity,
                        type: product.type,
                    })
            });
            console.log('robie request: ' + JSON.stringify(downloadedFridge));
            axios.post('http://localhost:8080/recipes/available', downloadedFridge)

                .then(response => {
                    console.log("response: " + response.data);
                    this.setState({recipes: response.data})
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
        const labels = {
            name: 'Name: ',
            detailsButton: 'Pokaż przepis',
            searchRestaurantsButton: 'Wyszukaj restauracje'
        };

        const recipesTableRows = this.state.recipes.map((recipe, key) =>
            <tr key={key}>
                <td>{recipe.name}</td>
                <td>
                    <Link style={{textDecoration: 'none', color: 'white'}} to={`/RecipeDetails/${recipe.id}`}
                          id={recipe.id}>
                        <button style={{textDecoration: 'none', color: 'white'}}
                                className="btn btn-outline-success">{labels.detailsButton}</button>
                    </Link>
                    <Route path={`/RecipeDetails/:id`}
                           render={(props) => (
                               <RecipesDetail {...props} id={recipe.id}/>)}
                    />
                </td>
            </tr>
        );

        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <div className="row">
                            <table className="table">
                                <tbody>
                                {recipesTableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default AvailableRecipes

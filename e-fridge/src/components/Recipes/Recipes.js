import React from "react";
import axios from 'axios';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import './Recipes.css'
import {Switch} from "react-router";
import ButtonGroup from "react-bootstrap/es/ButtonGroup";
import fire from "../../config/Fire";

class Recipes extends React.Component {
    state = {
        userId: localStorage.getItem('user'),
        recipes: [
            {
                id: 0,
                name: ''
            }
        ],
        tempRecipes: [
            {
                id: 0,
                name: ''
            }
        ],
        nameSearchParam: ''
    };

    constructor(props) {
        super(props);
        this.database = fire.database().ref(`fridge/userId/${this.state.userId}`);
        // this.database = fire.database().ref(`fridge/userId/Bx9HFzhuvOWPxgNgi2GMXYEfXLj1`);
        this.handleChangeSearchParam = this.handleChangeSearchParam.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getOnClick = this.getOnClick.bind(this);


        axios.get('http://localhost:8080/recipes/all')
            .then(response => {
                this.setState({recipes: response.data})
            });

    }



    getDataFromDatabase() {
    }

    componentWillMount() {
        this.getDataFromDatabase();
    }

    handleClick() {
        console.log("wyszukuje restauracje");
        if (this.state.nameSearchParam === '') {
            alert('Nie podano parametru wyszukiwania');
        } else {
            axios.get('http://localhost:8080/recipes/findByName?name=' + this.state.nameSearchParam)
                .then(response => {
                    this.setState({recipes: response.data})
                });
        }
    }

    getOnClick() {
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
            console.log('robie request: ' + JSON.stringify(downloadedFridge));
            axios.post('http://localhost:8080/recipes/available', downloadedFridge)

                .then(response => {
                    console.log("response: " + response.data);
                    this.setState({recipes: response.data})
                });
        })
    }

    render() {
        const labels = {
            name: 'Name: ',
            detailsButton: 'Pokaż przepis',
            searchRestaurantsButton: 'Wyszukaj'
        };

        const recipesTableRows = this.state.recipes.map((recipe, key) =>
            <tr key={key}>
                <td>{recipe.name}</td>
                <td>
                    <a style={{textDecoration: 'none', color: 'white'}} href={`/RecipeDetails/${recipe.id}`}
                       id={recipe.id}>
                        <button style={{textDecoration: 'none', color: 'white'}}
                                className="btn btn-outline-success">{labels.detailsButton}</button>
                    </a>
                </td>
            </tr>
        );

        return (
            <div className="container">

                <h1>Wyszukaj przepisy:</h1>
                <BrowserRouter>
                    <Switch>
                        <div className="container">
                            <div className="row">

                            </div>
                            <div className="row">
                                <table className="table table-bordered table-dark">
                                    <thead className="table-active">
                                    <td>
                                        <input className="form-control" value={this.state.nameSearchParam}
                                               onChange={this.handleChangeSearchParam}/>
                                    </td>
                                    <td><ButtonGroup>
                                        <button style={{textDecoration: 'none', color: 'white'}}
                                                className="btn btn-outline-success"
                                                onClick={this.handleClick}>{labels.searchRestaurantsButton}</button>
                                        <button style={{textDecoration: 'none', color: 'white'}}
                                                className="btn btn-outline-success"
                                                onClick={this.getOnClick}>Pokaż dostępne
                                        </button>
                                    </ButtonGroup>
                                    </td>
                                    </thead>
                                    <tbody>
                                    {recipesTableRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }


    static showRecipeDetails(recipeId) {
        alert("Przechodze do widoku przepisu o id: " + recipeId + ". TODO: do zaimplementowania");
    }

    handleChangeSearchParam(event) {
        this.setState({nameSearchParam: event.target.value})
    }
}

export default Recipes

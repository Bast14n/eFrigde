import React from "react";
import axios from 'axios';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import './Recipes.css'
import {Switch} from "react-router";
import ButtonGroup from "react-bootstrap/es/ButtonGroup";

class Recipes extends React.Component {
    state = {
        recipes: [
            {
                id: 0,
                name: ''
            }
        ],
        nameSearchParam: ''
    };

    constructor(props) {
        super(props);

        this.handleChangeSearchParam = this.handleChangeSearchParam.bind(this);
        this.handleClick = this.handleClick.bind(this)


        axios.get('http://localhost:8080/recipes/all')
            .then(response => {
                this.setState({recipes: response.data})
            });

    }

    handleClick() {
        console.log("wyszukuje restauracje")
        if (this.state.nameSearchParam === '') {
            alert('Nie podano parametru wyszukiwania');
        } else {
            axios.get('http://localhost:8080/recipes/findByName?name=' + this.state.nameSearchParam)
                .then(response => {
                    this.setState({recipes: response.data})
                });
        }
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
                                                onClick={()=>alert("TODO: implements")}>Pokaż dostępne</button>
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

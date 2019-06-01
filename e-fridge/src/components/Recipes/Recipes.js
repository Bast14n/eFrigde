import React from "react";
import axios from 'axios';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import RecipesDetail from './Detail/RecipesDetail';

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
            searchRestaurantsButton: 'Wyszukaj restauracje'
        };

        const recipesTableRows = this.state.recipes.map((recipe, key) =>
            <tr key={key}>
                <td>{recipe.name}</td>
                <td>
                    <Link style={{textDecoration: 'none', color: 'white'}} to={`/RecipeDetails/${recipe.id}`} id={recipe.id}>
                        <button style={{textDecoration: 'none', color: 'white'}} className="btn btn-outline-success">{labels.detailsButton}</button>
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
                            <div className="col-lg-6">
                                <input className="form-control" value={this.state.nameSearchParam}
                                       onChange={this.handleChangeSearchParam}/>
                            </div>
                            <div className="col-lg-3">
                                <button style={{textDecoration: 'none', color: 'white'}} className="btn btn-outline-success"
                                        onClick={this.handleClick}>{labels.searchRestaurantsButton}</button>
                            </div>
                        </div>
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

    static showRecipeDetails(recipeId) {
        alert("Przechodze do widoku przepisu o id: " + recipeId + ". TODO: do zaimplementowania");
    }

    handleChangeSearchParam(event) {
        this.setState({nameSearchParam: event.target.value})
    }
}

export default Recipes

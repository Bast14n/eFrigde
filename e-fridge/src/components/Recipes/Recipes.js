import React from "react";
import axios from 'axios';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import RecipesDetail from './Detail/RecipesDetail';

class Recipes extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeSearchParam = this.handleChangeSearchParam.bind(this);
        this.handleClick = this.handleClick.bind(this)

        this.state = {
            recipes: [
                {
                    id: 0,
                    name: ''
                }
            ],
            nameSearchParam: ''
        };


        axios.get('http://localhost:8080/recipes/all')
            .then(response => {
                this.setState({recipes: response.data})
            });

    }

    handleClick() {
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
                    <Link to={`/RecipeDetails/${recipe.id}`} id={recipe.id}>
                        <button>{labels.detailsButton}</button>
                    </Link>
                    <Route path={`/RecipeDetails/:id`}
                           render={(props) => (<RecipesDetail {...props} id={recipe.id}/>)}/>
                </td>
            </tr>
        );

        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row">
                        <input value={this.state.nameSearchParam} onChange={this.handleChangeSearchParam}/>
                        <button>{labels.searchRestaurantsButton}</button>
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

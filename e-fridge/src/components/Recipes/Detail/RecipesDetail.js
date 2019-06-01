import React from 'react';
import axios from 'axios';
import Ingredients from './Ingredients';
import './RecipesDetail.css' ;
import {Link} from "react-router-dom";
import ButtonGroup from "react-bootstrap/es/ButtonGroup";

class RecipesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeId: this.props.match.params.id,
            recipe: {
                name: "",
                description: "",
                ingredients: []

            }
        };

        axios.get('http://localhost:8080/recipes/' + this.state.recipeId)
            .then(response => {
                this.setState({recipe: response.data})
            });
        // localStorage.removeItem('recpieId');
    }


    render() {
        return (
            <div style={{width:'60%'}} className="container">
                <h1 className="card-header">{this.state.recipe.name}</h1>
                <p className="h3 card-text text-light">Przygotowanie:</p>
                {/*<center style="text-align: center;">*/}
                <h1 className="text-danger"> TODO: usuń słowo przygotowanie z API</h1>
                <p className="card-text text-light">{this.state.recipe.description}</p>
                <p className="h3 card-text text-light">Składniki:</p>
                <div className="text-light">
                    {
                        this.state.recipe.ingredients.map(ingredient => (
                            <Ingredients {...ingredient}/>
                        ))
                    }
                </div>
                <ButtonGroup>
                    <button onClick={() => alert("TODO: implement")} className="btn btn-outline-success" style={{textDecoration: 'none', color: 'white'}}>Wykorzystaj
                        przepis
                    </button>
                    <button onClick={() => alert("TODO: implement")} className="btn btn-outline-success" style={{textDecoration: 'none', color: 'white'}}>Wygeneruj listę
                        zakupową
                    </button>

                    <button className="btn btn-outline-success"><Link style={{textDecoration: 'none', color: 'white'}}
                                                                      to="/RecipeDetails">Wstecz</Link></button>

                </ButtonGroup>
            </div>
        )
    }
}


export default RecipesDetail;

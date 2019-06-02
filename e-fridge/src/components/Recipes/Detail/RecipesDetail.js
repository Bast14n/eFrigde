import React from 'react';
import axios from 'axios';
import Ingredients from './Ingredients';
import './RecipesDetail.css' ;
import {Link} from "react-router-dom";
import ButtonGroup from "react-bootstrap/es/ButtonGroup";
import fire from "../../../config/Fire";

class RecipesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('user'),
            recipeId: this.props.match.params.id,
            recipe: {
                name: "",
                description: "",
                ingredients: []

            },
            fridge: []
        };

        this.database = fire.database().ref(`fridge/userId/${this.state.userId}`);

        axios.get('http://localhost:8080/recipes/' + this.state.recipeId)
            .then(response => {
                this.setState({recipe: response.data})
            });
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
            <div style={{width: '60%'}} className="container">
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
                    <button onClick={() => {
                        for (let i = 0; i < this.state.recipe.ingredients.length; i++) {
                            const fridgeIngredientIndex = this.state.fridge.findIndex(fridgeItem => fridgeItem.id === this.state.recipe.ingredients[i].id);
                            if (fridgeIngredientIndex === -1) {
                                alert('brakuje ci ' + this.state.recipe.ingredients[i].name);
                            }
                        }
                        for (let recipeIngredient of this.state.recipe.ingredients) {
                            const fridgeIngredientIndex = this.state.fridge.findIndex(fridgeItem => fridgeItem.id === recipeIngredient.id);
                            const fridgeIngredient = this.state.fridge[fridgeIngredientIndex];
                            if (fridgeIngredient.quantity < recipeIngredient.quantity) {
                                alert('brakuje ci ' + (recipeIngredient.quantity - fridgeIngredient.quantity) + ' ' + recipeIngredient.name);
                                break;
                            }
                            else {
                                const sub = this.state.fridge[fridgeIngredientIndex].quantity - recipeIngredient.quantity;
                                if (sub === 0) {
                                    this.state.fridge.splice(fridgeIngredientIndex, 1);
                                    alert(this.state.fridge.length)
                                    // alert('wykorzystano cały składnik');

                                }
                                else {
                                    this.state.fridge[fridgeIngredientIndex].quantity -= recipeIngredient.quantity;
                                    alert('wykorzystano przepis');
                                }
                            }
                        }
                        this.forceUpdate();
                        alert(this.state.fridge.length);
                        this.database.update(this.state.fridge);
                    }} className="btn btn-outline-success" style={{textDecoration: 'none', color: 'white'}}>Wykorzystaj
                        przepis
                    </button>
                    <button onClick={() => alert("TODO: implement")} className="btn btn-outline-success"
                            style={{textDecoration: 'none', color: 'white'}}>Wygeneruj listę
                        zakupową
                    </button>

                    <button className="btn btn-outline-success"><Link style={{textDecoration: 'none', color: 'white'}}
                                                                      to="/RecipeDetails">Wstecz</Link></button>

                </ButtonGroup>
            </div>
        )
    }

    useRecipe() {
        const dupa = this.checkIngredients;
        alert('dupa');
    }

    checkIngredients() {
        this.state.recipe.ingredients.forEach(recipeIngredient => {
            const fridgeIngredientIndex = this.state.fridge.findIndex(ingredient => ingredient.id == recipeIngredient.id);
            if (fridgeIngredientIndex === -1) {
                return false;
            }
            else return true;
        });
    }

}


export default RecipesDetail;

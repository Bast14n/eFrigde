import React from 'react';
import axios from 'axios';
import Ingredients from './Ingredients';

class RecipesDetail extends React.Component{
    constructor(props) {
        super(props);
            this.state = {
            recipeId: props.id,
            recipe: {
                name: "",
                description: "",
                ingredients: []

            }
        };

        axios.get('http://localhost:8080/recipes/'+this.state.recipeId)
            .then(response => {
                this.setState({recipe: response.data})
            });
        // localStorage.removeItem('recpieId');
    }



    render(){
        return(
            <div>
            <h1>{this.state.recipe.name}</h1>
                <p>{this.state.recipe.description}</p>
                <ul>
                    {
                        this.state.recipe.ingredients.map(ingredient => (
                            <Ingredients {...ingredient}/>
                        ))
                    }
                </ul>
            </div>
        )
    }
}


export default RecipesDetail;
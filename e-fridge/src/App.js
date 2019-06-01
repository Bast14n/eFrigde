import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'


// import fire from './config/Fire';
import Home from './Home';
import LOGO from './logo.png';
// import Login from './Login';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Add from "./AddProduct";
import Recipes from "./components/Recipes/Recipes";
import RecipesDetail from "./components/Recipes/Detail/RecipesDetail";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyB0oNIdCxxr6QyniIO9e1luNzR6giC4nDY",
        authDomain: "efridge-5256e.firebaseapp.com",
        databaseURL: "https://efridge-5256e.firebaseio.com",
        projectId: "efridge-5256e",
        storageBucket: "efridge-5256e.appspot.com",
        messagingSenderId: "630139984649",
        appId: "1:630139984649:web:d8a2d5685d0270ec"
    });
}


class App extends Component {
    state = {isSignedIn: false}
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn: !!user})
            localStorage.setItem('user', user.uid);
            console.log("user", user)
        })
    }

    render() {
        return (<div className="App">
                <div className="area">
                    <ul className="circles">
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                    </ul>
                </div>
                <div className="context align-content-center">
                    {this.state.isSignedIn ? (
                        <BrowserRouter>
                            <Switch>
                            <span>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-info">
                                        <Link style={{textDecoration: 'none', color: 'white'}} to="/">
                                            Podgląd Twojej lodówki</Link>
                                        </button>
                                        <button type="button" className="btn btn-outline-info">
                                    <Link style={{textDecoration: 'none', color: 'white'}} to="/add-product">Dodaj produkt do lodówki</Link>
                                        </button>
                                        <button type="button" className="btn btn-outline-info">
                                    <Link style={{textDecoration: 'none', color: 'white'}} to="/RecipeDetails">Wyszukaj dostępny przepis</Link>
                                        </button>
                                    <button type="button" className="btn btn-outline-warning" onClick={() => {
                                        firebase.auth().signOut();
                                        localStorage.removeItem('user');
                                    }}>
                                        Wyloguj!
                                    </button>
                                </div>

                                <div className="btn-group" role="group" aria-label="Basic example">

                                </div>
                                {/*<h1>Witaj {firebase.auth().currentUser.displayName}!</h1>*/}
                                <div className="component">
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path="/add-product" component={Add}/>
                                    <Route exact path="/RecipeDetails" component={Recipes}/>
                                    <Route exact path="/RecipeDetails/:id" component={RecipesDetail}/>
                                </div>
                            </span>
                            </Switch>
                        </BrowserRouter>
                    ) : (

                        <div className="context">
                            <h1 className="component">Witaj w eFrige!</h1>
                            <h3 className="text-light">eFrigde to aplikacja, która pozwoli Ci znaleźć przepis
                                wykorzystując składniki które wprowadzisz!</h3>
                            <img src={LOGO} alt="error" width="200px"/>
                            <div className="component">
                                <StyledFirebaseAuth
                                    uiConfig={this.uiConfig}
                                    firebaseAuth={firebase.auth()}
                                />
                            </div>
                            {/*<button onClick={this.Login}>Register</button>*/}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default App;

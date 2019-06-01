import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'


// import fire from './config/Fire';
import Home from './Home';
// import Login from './Login';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Add from "./AddProduct";
import Search from "./components/Recipes/Recipes";

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
            <div className="context">
                    {this.state.isSignedIn ? (
                        <BrowserRouter>
                            <Switch>
                            <span>
                                <div className="btn-group" role="group" aria-label="Basic example">

                                    <button type="button" className="btn btn-outline-info">
                                        <Link style={{textDecoration: 'none', color: 'white'}}
                                              to="/profile">Twój profil</Link>
                                    </button>
                                    <button type="button" className="btn btn-outline-info">
                                        <Link style={{textDecoration: 'none', color: 'white'}} to="/your-fridge">
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
                            <h1>Witaj {firebase.auth().currentUser.displayName}!</h1>
                                <Route exact path="/profile" component={Home}/>
                                <Route exact path="/your-fridge" component={Home}/>
                                <Route exact path="/add-product" component={Add}/>
                                <Route path="/RecipeDetails" component={Search}/>

                            </span>
                            </Switch>
                        </BrowserRouter>
                    ) : (
                        <div>
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                            {/*<button onClick={this.Login}>Register</button>*/}
                        </div>
                    )}
            </div>
            </div>
        )
    }
}

export default App;

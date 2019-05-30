import React, { Component } from 'react';
import './App.css';

// import fire from './config/Fire';
import Home from './Home';
// import Login from './Login';
import ProductWrapper from "./components/ProductWrapper/ProductWrapper.js";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

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
  state = { isSignedIn: false }
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
      this.setState({ isSignedIn: !!user })
      localStorage.setItem('user',user.uid);
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => {firebase.auth().signOut(); localStorage.removeItem('user');}}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile pic"
              src={firebase.auth().currentUser.photoURL}
            />
            <Home />
            <ProductWrapper/>
          </span>
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
    )
  }
}

export default App

// class App extends Component {
//   constructor() {
//     super();
//     this.state = ({
//       user: null,
//     });
//     this.authListener = this.authListener.bind(this);
//   }

//   componentDidMount() {
//     this.authListener();
//   }

//   authListener() {
//     fire.auth().onAuthStateChanged((user) => {
//       console.log(user);
//       if (user) {
//         this.setState({ user });
//         localStorage.setItem('user', user.uid);
//       } else {
//         this.setState({ user: null });
//         localStorage.removeItem('user');
//       }
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         {this.state.user ? (
//           <>
//           <Home />
//           <ProductWrapper/>
//             </>
//         ) :
//           (
//             <Login />
//           )}
//       </div>
//     );
//   }
// }

// export default App;
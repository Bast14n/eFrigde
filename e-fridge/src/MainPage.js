import React from 'react';
import Logo from './logo.png';
import './MainPage.css';
import App from './App.js';


const MainPage = () => (
    <>
        <head>

        </head>
        <body>
        <div className="MainContainer">
            <h2 className="text-success">Witaj w eFridge!</h2>
            <img src={Logo} alt="logo" className="logoImage"/>
            <h4 className="text-center">Wybierz opcję logowania</h4>
        </div>
        <App/>

        </body>
    </>
);

export default MainPage;
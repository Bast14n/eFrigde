import React, { Component } from 'react';
import fire from './config/Fire';
import ProductWrapper from "./components/ProductWrapper/ProductWrapper";

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <ProductWrapper/>
            </div>
        );

    }

}

export default Home;
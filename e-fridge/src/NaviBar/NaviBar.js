import React from 'react';
import './NaviBar.css';
import Button from "reactstrap/es/Button";
import {Link} from "react-router-dom";

export const NaviBar = () => (
    <div className="App-navibar">
            <Button className="App-button">
                    <Link to="/navibar">
                            Button 1
                    </Link>
            </Button>
    </div>
);


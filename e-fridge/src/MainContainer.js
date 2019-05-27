import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {NaviBar} from "./NaviBar/NaviBar";

export const MainContainer = () => (
    <div>
        <BrowserRouter>
            <><Switch>
                <NaviBar/>
                <Route path="/navibar" component={NaviBar}/>
            </Switch>
            </>
        </BrowserRouter>
    </div>
);

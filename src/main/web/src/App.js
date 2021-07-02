import './App.css';
import React from "react";
import {Master} from "./components/Master";
import {BrowserRouter, Route} from "react-router-dom";
import './style.css'

function App() {
    return (<BrowserRouter>
        <Route path={"/"} component={Master}/>
    </BrowserRouter>)
}

export default App;

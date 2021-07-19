import React from 'react';
import './App.css';
import {Header} from "./main/header/Header";
import {Routing} from "./routing/Routing";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routing/>
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { useEffect } from 'react';
import { Header } from './components/Header';
import Authorize from './components/Authorize';
import CategoryManager from './Managers/CategoryManager';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("user")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])
//By wrapping your application with the CategoryManager: context is available to all components within the application tree
    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
            <CategoryManager>
                <ApplicationViews />
                </CategoryManager>
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}

export default App;


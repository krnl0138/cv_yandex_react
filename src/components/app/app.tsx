import AppHeader from '../app-header/app-header';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes/routes';

export default function App(): JSX.Element {

    return (
        <Router>
            <AppHeader />
            <Routes />
        </Router>
    )
}
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/ingredients';

import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '../routes/routes';

import { ProvideAuth } from '../../services/auth';

export default function App() {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    return (
        <ProvideAuth>
            <Router>
                <AppHeader />
                <Routes />
            </Router>
        </ProvideAuth>
    )
}
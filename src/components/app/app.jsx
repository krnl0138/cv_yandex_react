import AppHeader from '../app-header/app-header';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes/routes';

export default function App() {

    return (
        <Router>
            <AppHeader />
            <Routes />
        </Router>
    )
}
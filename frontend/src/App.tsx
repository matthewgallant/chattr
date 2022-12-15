import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/Main.scss'

import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Accounts */}
                <Route path='/login' element={<LoginPage />} />

                {/* Core App */}
                <Route path='/dashboard' element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;

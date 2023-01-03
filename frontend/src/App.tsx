import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/Main.scss'

import LoginPage from './pages/Login'
import ChannelPage from './pages/Channel'

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Core App */}
                <Route path='/' element={<Navigate replace to="/channel" />} />
                <Route path='/channel' element={<ChannelPage />} />
                <Route path='/channel/:id' element={<ChannelPage />} />

                {/* Accounts */}
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;

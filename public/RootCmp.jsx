const { useState } = React

const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { UserMsg } from './cmps/UserMsg.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { authService } from './services/auth.service.js'

export function App() {
        const [loggedInUser , setLoggedInUser ] = useState(authService.getLoggedinUser())
    return <Router>
        <div className="app-wrapper">
            <UserMsg />
            <AppHeader loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/bug" element={<BugIndex />} />
                    <Route path="/bug/:bugId" element={<BugDetails />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="auth" element={<LoginSignup setLoggedInUser={setLoggedInUser}/>}/>
                </Routes>
            </main>
            <AppFooter />
        </div>
    </Router>
}

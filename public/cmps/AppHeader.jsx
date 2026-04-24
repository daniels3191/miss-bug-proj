import { authService } from "../services/auth.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { NavLink, Link } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader({ loggedInUser, setLoggedInUser }) {

    const navigate = useNavigate()

    function onLogout() {
        authService.logout()
            .then(() => {
                setLoggedInUser(null)
                navigate('/auth')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Couldn't logout`)
            })
    }

    return <header className="app-header main-content single-row">
        <h1>Miss Bug</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/bug">Bugs</NavLink>
            <NavLink to="/about">About</NavLink>
            {!loggedInUser ?
                <NavLink to="/auth">Login</NavLink> :
                  <div className="user">   
                    <span> | </span>
                        <Link to={`/user/${loggedInUser._id}`}>{loggedInUser.fullname}</Link>
                        <button className="btn-logout" onClick={onLogout}>Logout</button>
                    </div>
                
            }

        </nav>
    </header>
}
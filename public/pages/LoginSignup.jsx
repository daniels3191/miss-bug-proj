import { authService } from "../services/auth.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"

const { useState } = React
const { useNavigate } = ReactRouter


export function LoginSignup({ setLoggedInUser }) {

    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    function handelSubmit(ev) {
        ev.preventDefault()
        isSignup ? signup(credentials) : login(credentials)
    }

    function signup(credentials) {
        authService.signup(credentials)
            .then(user => {
                setLoggedInUser(user)
                showSuccessMsg('Signed in successfully!')
                navigate('/bug')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Cant\' signedup...')
            })
    }

    function login(credentials) {
        authService.login(credentials)
            .then(user => {
                setLoggedInUser(user)
                showSuccessMsg('Loged in successfully!')
                navigate('/bug')
            }).catch(err => {
                console.log(err)
                showErrorMsg('Can\'t login...')
            })
    }

    return <div className="login-page">
        <button className="btn-issignup"
            onClick={(() => setIsSignUp(!isSignup))}>
            {!isSignup ?
                'New user?  Click to sign up' :
                'Already a member? Login'}
        </button>

        <form className="login-form" onSubmit={handelSubmit}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            {isSignup && <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
            />}
            <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>
    </div>
}
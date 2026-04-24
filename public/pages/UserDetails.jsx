const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { BugList } from "../cmps/BugList.jsx"
import { Pagination } from "../cmps/Pagination.jsx"
import { bugService } from "../services/bug.service.js"
import { userService } from "../services/user.service.js"

export function UserDetails() {

    const [user, setUser] = useState(null)
    const [bugs, setBugs] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
        loadBugs()
    }, [])

    function loadUser() {
        userService.getById(params.userId)
            .then(user => setUser(user))
            .catch(err => {
                console.log(err);
                navigate('/')
            })
    }

    function loadBugs() {
        bugService.query({ ownerId: params.userId })
            .then(res => {
                setBugs(res.bugs)
            })
            .catch(err => showErrorMsg(`Couldn't load bugs - ${err}`))
    }

    if (!user || !bugs) return <div>Loading...</div>
    return <div className="user-details main-content">

        <h1 className="header">{user.fullname} Profile Page</h1>
        <pre>
            {JSON.stringify(user, null, 2)}
        </pre>
        {bugs && <BugList bugs={bugs} /> }

        {user.isAdmin && <button><Link to="/user/userIndex">Admin User Index</Link></button>}
    </div>
    
}



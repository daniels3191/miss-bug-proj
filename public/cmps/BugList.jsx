const { Link } = ReactRouterDOM

import { authService } from '../services/auth.service.js'
import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug, onEditBug}) {
    const isInUserProfile = (onRemoveBug && onEditBug)? false : true
    const loggedInUser = authService.getLoggedinUser()

    function isAuthorized(bug) {
        if(!loggedInUser || loggedInUser._id !== bug.owner._id) return false

        return true
    }

    function shouldBeDesplayd(bug){
        if(!isInUserProfile && isAuthorized(bug)) return true

        return false
    }
    
    if (!bugs) return <div>Loading...</div>
    return <ul className="bug-list">
        {bugs.map(bug => (
            <li key={bug._id}>
                <BugPreview bug={bug}/>
             <section className="actions">
                    <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
                     {shouldBeDesplayd(bug) && <React.Fragment>
                        <button onClick={() => onEditBug(bug)}>Edit</button>
                        <button onClick={() => onRemoveBug(bug._id)}>x</button>
                    </React.Fragment>}
                </section>
            </li>
        ))}
    </ul >
}

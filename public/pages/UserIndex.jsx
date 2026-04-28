import { UserList } from "../cmps/UserList.jsx"
import { userService } from "../services/user.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


const { useState, useEffect } = React

export function UserIndex() {
    const [users, setUsers] = useState(null)

useEffect(loadUsers, [])

    function onRemoveUser(userId) {
        userService.remove(userId)
            .then(() => {
                loadUsers()
                showSuccessMsg('user has been removed')
            })
            .catch((err) => showErrorMsg(`Cannot remove bug`, err))
    }

    function loadUsers() {
        userService.query()
            .then(res => {
                setUsers(res)
            })
            .catch(err => showErrorMsg(`Couldn't load users - ${err}`))
    }

    return <div className="user-index">
        <p>user-index</p>
        <UserList onRemoveUser={onRemoveUser} users={users} />
    </div>
}
import { userService } from "../services/user.service.js"

const { useState, useEffect } = React

export function UserIndex() {
    const [users, setUsers] = useState(null)
    useEffect(() => {
        userService.query()
            .then(res => {
                console.log(res);
                setUsers(res)
            })
            .catch(err => showErrorMsg(`Couldn't load users - ${err}`))
    }, [users])

        function onRemoveUser(userId) {
             .remove(userId)
                .then(() => {
                    loadBugs()
                    showSuccessMsg('Bug removed')
                })
                .catch((err) => showErrorMsg(`Cannot remove bug`, err))
        }

    return <div className="user-index">
        <p>user-index</p>
    </div>
}
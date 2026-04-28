

export function UserList({ onRemoveUser, users }) {

    console.log(users);
    

    if (!users) return <div>Loading...</div>
    return <ul className="user-list">
        {users.map(user => (
            <li key={user._id}>
                <p className="fullname">{user.fullname}</p>
                <p>User Id: <span>{user._id}</span></p>
                <p>Is Admin: <span>{user.isAdmin? 'true' : 'false'}</span></p>
                <section className="actions">
                    <button onClick={() => onRemoveUser(user._id)}>x</button>
                </section>
            </li>
        ))}
    </ul >
}
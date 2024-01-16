

import { UserPreview } from "./UserPreview"

export function NavSide({ loggedinUser, users }) {
    console.log('users:', users)

    return (
        <section className="nav-side">
            <UserPreview imgUrl={loggedinUser.imgUrl} username={loggedinUser.username} spanContent={loggedinUser.fullname} btnContent="Logout" />

            <h3>Suggested for you</h3>

            <ul>
                {users.map(user => <li key={user._id}>
                    <UserPreview imgUrl={user.imgUrl} username={user.username} spanContent="Followed by.." btnContent="Follow" />

                </li>)}

            </ul>
        </section>
    )
}
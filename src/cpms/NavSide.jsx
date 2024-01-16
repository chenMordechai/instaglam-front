

import { UserPreview } from "./UserPreview"

export function NavSide({ loggedinUser, users, onAddFollowing, onRemoveFollowing, onLogout, updatedUser }) {
    function isFollowing(username) {
        return username === updatedUser?.username
    }

    return (
        <section className="nav-side">
            <UserPreview imgUrl={loggedinUser.imgUrl} username={loggedinUser.username} spanContent={loggedinUser.fullname} btnContent="Logout" func={onLogout} />

            <h3>Suggested for you</h3>

            <ul>
                {users.map(user => <li key={user._id}>
                    <UserPreview userId={user._id} imgUrl={user.imgUrl} username={user.username} spanContent={`Followed by ${user.commonFollowings[0]}`} btnContent={(isFollowing(user.username)) ? 'Following' : 'Follow'} func={(isFollowing(user.username)) ? onRemoveFollowing : onAddFollowing} />

                </li>)}

            </ul>
        </section>
    )
}
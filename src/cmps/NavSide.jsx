import {memo} from 'react'

import { UserPreview } from "./UserPreview"

export const NavSide = memo(({ loggedinUser, users, onAddFollowing, onRemoveFollowing, onLogout, updatedUsers })=> {
  
    function isFollowing(userId) {
        return (updatedUsers.find(u=> u._id === userId))?true : false
    }

    return (
        <section className="nav-side">
            <UserPreview imgUrl={loggedinUser.imgUrl} username={loggedinUser.username} spanContent={loggedinUser.fullname} btnContent="Logout" func={onLogout} />

            <h3>Suggested for you</h3>
            <ul>
                {users.map(user => <li key={user._id}>
                    <UserPreview userId={user._id} imgUrl={user.imgUrl} username={user.username} spanContent={`Followed by ${user.commonFollowings[0]}`} btnContent={(isFollowing(user._id)) ? 'Following' : 'Follow'} func={(isFollowing(user._id)) ? onRemoveFollowing : onAddFollowing} />
            </li>)}
            </ul>
        </section>
    )
})
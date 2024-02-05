import { useState } from 'react'
import { useSelector } from 'react-redux'

import { MessageHeader } from '../cmps/MessageHeader'
import { SimpleHeader } from '../cmps/SimpleHeader'
import { Search } from '../pages/Search'
import { useToggle } from '../customHooks/useToggle'
import { Users } from "../cmps/Users";
import { MessageList } from "../cmps/MessageList";
import { UserPreview } from "../cmps/UserPreview";

export function Message() {
    const loggedinUser  = useSelector(storeState => storeState.userModule.loggedinUser)
    const users  = useSelector(storeState => storeState.userModule.users)

    const [openSearchModal, onToggleSearchModal] = useToggle(false)


    function goToChat(userId) {
        onToggleSearchModal()
        console.log('go to chat', userId)

    }

    function getOrderedUsers() {
        if (!users.length) return []
        const currUser = users.find(user => user._id === loggedinUser._id)
        const orderedUsers = [currUser, ...users.filter(user => user._id !== loggedinUser._id)]
        return orderedUsers
    }

    function isMobile() {
        return !(window.innerWidth > 700)
      }

    return (
        <section className="message">
            <section className="left-side">

            {!openSearchModal && <>
                {/* <MessageHeader username={loggedinUser?.username} /> */}
                <SimpleHeader h2Content={loggedinUser?.username}/>
                <div className="input-container">
                    <input onClick={onToggleSearchModal} type="text" placeholder="Search" />
                </div>
            </>}
            {openSearchModal && <Search onToggleSearchModal={onToggleSearchModal} goToChat={goToChat} />}

            {!openSearchModal  && isMobile() && <Users users={getOrderedUsers()} />}
            { !openSearchModal && !isMobile() &&<ul>
                {/* {users.map(user => <li key={user._id}>
                    <UserPreview userId={user._id} imgUrl={user.imgUrl} username={user.username} spanContent={`Followed by ${user.commonFollowings[0]}`} btnContent={(isFollowing(user._id)) ? 'Following' : 'Follow'} func={(isFollowing(user._id)) ? onRemoveFollowing : onAddFollowing} />
                </li>)} */}
            </ul>}

            </section>
            <section className="right-side">
            <MessageList />

            </section>

        </section>
    )
}
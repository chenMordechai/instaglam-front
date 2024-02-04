import { useState } from 'react'
import { useSelector } from 'react-redux'

import { MessageHeader } from '../cmps/MessageHeader'
import { Search } from '../pages/Search'
import { useToggle } from '../customHooks/useToggle'
import { Users } from "../cmps/Users";
import { MessageList } from "../cmps/MessageList";

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



    return (
        <section className="message">
            {!openSearchModal && <>
                <MessageHeader username={loggedinUser?.username} />
                <div className="input-container">
                    <input onClick={onToggleSearchModal} type="text" placeholder="Search" />
                </div>
            </>}
            {openSearchModal && <Search onToggleSearchModal={onToggleSearchModal} goToChat={goToChat} />}

            {!openSearchModal && <Users users={getOrderedUsers()} />}

            {/* <MessageList /> */}

        </section>
    )
}
import { useState, Fragment } from 'react'
import { useSelector } from 'react-redux'

import { MessageHeader } from '../cmps/MessageHeader'
import { Search } from '../pages/Search'
import { useToggle } from '../customHooks/useToggle'
import { Users } from "../cmps/Users";
import { MessageList } from "../cmps/MessageList";

export function Message() {
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    const { users } = useSelector(storeState => storeState.userModule)

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
            {!openSearchModal && <Fragment>
                <MessageHeader username={loggedinUser?.username} />
                <div className="input-container">
                    <input onClick={onToggleSearchModal} type="text" placeholder="Search" />
                </div>
            </Fragment>}
            {openSearchModal && <Search onToggleSearchModal={onToggleSearchModal} goToChat={goToChat} />}

            <Users users={getOrderedUsers()} />

            <MessageList />

        </section>
    )
}
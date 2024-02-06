import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { MessageHeader } from '../cmps/MessageHeader'
import { SimpleHeader } from '../cmps/SimpleHeader'
import { Search } from '../pages/Search'
import { useToggle } from '../customHooks/useToggle'
import { Users } from "../cmps/Users";
import { MessageList } from "../cmps/MessageList";
import { UserPreview } from "../cmps/UserPreview";
import { Chat } from "../cmps/Chat";
import message from '../assets/icons/message2.png'
import { useForm } from '../customHooks/useForm'


export function Message() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const users = useSelector(storeState => storeState.userModule.users)
    const [usersToShow, setUsersToShow] = useState(null)
    const [userToChat, setUserToChat] = useState(null)
    const [openSearchModal, onToggleSearchModal] = useToggle(false)
    const [search, setSearch, handleChange] = useForm({ name: '' })

    useEffect(() => {
        if (!search.name) setUsersToShow(users)
        else {
            const filteredUsers = users.filter(u => u.fullname.includes(search.name) || u.username.includes(search.name))
            setUsersToShow(filteredUsers)
        }
    }, [search, users])


    useEffect(() => {
        console.log('userToChat:', userToChat)
    }, [userToChat])
    function goToChat(userId) {
        onToggleSearchModal()
        console.log('go to chat', userId)
    }

    function getOrderedUsers() {
        return usersToShow?.filter(user => user._id !== loggedinUser._id)
    }

    function isMobile() {
        return !(window.innerWidth > 700)
    }

    if (!usersToShow) return <></>
    return (
        <section className="message">
            <section className="left-side">
                {!isMobile() && <>
                    <MessageHeader username={loggedinUser.username} />
                    <ul>
                        {usersToShow?.map(user => <li key={user._id}
                            onClick={() => setUserToChat(user)}
                            style={{ 'backgroundColor': (userToChat?._id === user._id) ? '#efefef' : 'white' }}>
                            <UserPreview userId={user._id} imgUrl={user.imgUrl} username={user.fullname} spanContent={`Active`} />
                        </li>)}
                    </ul>
                </>}

                {isMobile() && <>
                    <div className="input-container">
                        <input onChange={handleChange} type="text" name="name" value={search.name} placeholder="Search" />
                    </div>
                    <Users users={getOrderedUsers()} />
                </>}

            </section>
            <section className="right-side">
                {/* <MessageList /> */}

                {!userToChat && <div className="content-container">

                    <img src={message} />
                    <h2>Your messages</h2>
                    <span>Send private photos and messages to a friend or group</span>
                    <button>Send message</button>
                </div>}

                {userToChat && <Chat />}
            </section>

        </section>
    )
}
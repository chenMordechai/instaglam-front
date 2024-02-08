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
import pen from '../assets/icons/pen-to-square-regular.svg'
import camera from '../assets/icons/camera.png'


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

                {!isMobile() && <MessageHeader username={loggedinUser.username} />}
                {isMobile() && <>
                    <SimpleHeader h2Content={loggedinUser.username} spanContent={<img className="pen" src={pen} />} />
                    <div className="input-container">
                        <form>
                            <input onChange={handleChange} type="text" name="name" value={search.name} placeholder="Search" />
                        </form>
                    </div>
                    <Users users={getOrderedUsers()} />
                    <section className="sub-header">
                        <h3>Messages</h3>
                        <button className="clr-blue" >Requests</button>
                    </section>
                </>}
                <ul>
                    {usersToShow?.map(user => <li key={user._id}
                        onClick={() => setUserToChat(user)}
                        style={{ 'backgroundColor': (userToChat?._id === user._id) ? '#efefef' : 'white' }}>
                        <UserPreview userId={user._id} imgUrl={user.imgUrl} username={user.fullname} spanContent={`Active`} btnContent={ isMobile() && <img src={camera}/>} />
                    </li>)}
                </ul>


            </section>
             { !isMobile() && <section className="right-side">

                {!userToChat && <div className="content-container">
                    <div className="img-container">
                         <img src={message} />
                    </div>
                    <h2>Your messages</h2>
                    <span>Send private photos and messages to a friend or group</span>
                    <button className="btn">Send message</button>
                </div>}

                {userToChat && <Chat userToChat={userToChat} />}
            </section>}

        </section>
    )
}
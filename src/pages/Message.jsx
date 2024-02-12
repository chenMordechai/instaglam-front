import { useState, useEffect, useRef } from 'react'
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
import { utilService } from '../services/util.service.js'
import { msgService } from '../services/msg.service.js'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_TYPING, SOCKET_EVENT_STOP_TYPING, SOCKET_EMIT_TYPING, SOCKET_EMIT_STOP_TYPING } from '../services/socket.service'


export function Message() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const users = useSelector(storeState => storeState.userModule.users)
    const [usersToShow, setUsersToShow] = useState(null)
    const [userToChat, setUserToChat] = useState(null)
    const [openSearchModal, onToggleSearchModal] = useToggle(false)
    const [search, setSearch, handleChange] = useForm({ name: '' })

    const [msgInfo, setMsgInfo] = useState(null)
    const [newMsg, setNewMsg, handleNewMsgChange] = useForm({ txt: 'h' })
    const [typingUser, setTypingUser] = useState(null)

    const timeoutId = useRef()

    useEffect(() => {
        if (!search.name) setUsersToShow(users)
        else {
            // search user
            const filteredUsers = users.filter(u => u.fullname.includes(search.name) || u.username.includes(search.name))
            setUsersToShow(filteredUsers)
        }
    }, [search, users])

    useEffect(() => {
        if (userToChat) loadHistory()

    }, [userToChat])

    useEffect(() => {
        if (!userToChat) return
        // Join room
        socketService.emit('chat-set-topic', msgInfo?._id)
        // Add listeners
        socketService.on('chat-add-msg', addMsg)
        socketService.on('chat-add-typing', showTyping)
        socketService.on('chat-remove-typing', removeTypingUser)

        // Remove on unmount
        return () => {
            socketService.off('chat-add-msg', addMsg)
            socketService.off('chat-add-typing', showTyping)
            socketService.off('chat-remove-typing', removeTypingUser)

            clearTimeout(timeoutId.current)
        }
    }, [userToChat, msgInfo?._id])

    function goToChat(userId) {
        onToggleSearchModal()
        console.log('go to chat', userId)
    }

    function getOrderedUsers() {
        return usersToShow?.filter(user => user._id !== loggedinUser._id)
    }

    async function loadHistory() {
        const loggedinUserFull = users.find(user => user._id === loggedinUser._id)
        const msgId = loggedinUserFull.msgsIds.find(id1 => {
            return userToChat.msgsIds.find(id2 => {
                return id1 === id2
            })
        })
        const msgInfo = await msgService.getById(msgId)
        setMsgInfo(msgInfo)
    }

    function showTyping(fullname) {
        console.log(fullname, 'is typing')
        setTypingUser(fullname)
    }
    function removeTypingUser() {
        console.log('removeTyping user')
        setTypingUser(null)
    }

    function addMsg(newMsg) {
        setMsgInfo(prevMsgInfo => ({ ...prevMsgInfo, history: [...prevMsgInfo.history, newMsg] }))
    }

    function sendMsg(ev) {
        console.log('sendMsg')
        ev.preventDefault()
        const userId = loggedinUser._id
        const msgToSend = { userId, txt: newMsg.txt }
        socketService.emit('chat-send-msg', msgToSend)

        socketService.emit('chat-stop-typing', userId)
        clearTimeout(timeoutId.current)
        timeoutId.current = null

        setNewMsg({ txt: '' })

    }


    function handleFormChange(ev) {
        const user = {
            _id: loggedinUser._id,
            fullname: loggedinUser.fullname
        }
        if (!timeoutId.current) socketService.emit('chat-user-typing', user)
        if (timeoutId.current) clearTimeout(timeoutId.current)

        timeoutId.current = setTimeout(() => {
            console.log('settimeout')
            socketService.emit('chat-stop-typing', user)
            timeoutId.current = null
        }, 2000);

        handleNewMsgChange(ev)
    }


    if (!usersToShow) return <></>
    return (
        <section className="message">
            <section className="left-side">

                {!utilService.isMobile() && <MessageHeader username={loggedinUser.username} />}
                {utilService.isMobile() && <>
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
                        <UserPreview goToChat={goToChat} userId={user._id} imgUrl={user.imgUrl} username={user.fullname} spanContent={`Active`} btnContent={utilService.isMobile() && <img src={camera} />} />
                    </li>)}
                </ul>

            </section>
            {!utilService.isMobile() && <section className="right-side">

                {!userToChat && <div className="content-container">
                    <div className="img-container">
                        <img src={message} />
                    </div>
                    <h2>Your messages</h2>
                    <span>Send private photos and messages to a friend or group</span>
                    <button className="btn">Send message</button>
                </div>}

                {userToChat && <Chat userToChat={userToChat} topic={msgInfo?._id} msgs={msgInfo?.history} loggedinUser={loggedinUser} typingUser={typingUser} sendMsg={sendMsg} handleFormChange={handleFormChange} newMsg={newMsg} />}
            </section>}

        </section>
    )
}
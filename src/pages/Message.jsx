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
import { eventBusService } from '../services/event-bus.service.js'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_TYPING, SOCKET_EVENT_STOP_TYPING, SOCKET_EMIT_TYPING, SOCKET_EMIT_STOP_TYPING } from '../services/socket.service'
import { userService } from '../services/user.service'
import { updateUsersMsgId} from '../store/actions/user.actions.js'


export function Message() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const users = useSelector(storeState => storeState.userModule.users)
    const [usersToShow, setUsersToShow] = useState(null)
    const [userToChat, setUserToChat] = useState(null)
    const [openSearchModal, onToggleSearchModal] = useToggle(false)
    const [search, setSearch, handleChange] = useForm({ name: '' })

    const [msgInfo, setMsgInfo] = useState(null)

    const [newMsg, setNewMsg, handleNewMsgChange] = useForm({ txt: '' })
    const [typingUser, setTypingUser] = useState(null)

    const [msgsToShow, setMsgsToShow] = useState(null)

    const [isNewMsg, setIsNewMsg] = useState(false)

    const timeoutId = useRef()

    useEffect(() => {
        if (!search.name) getOrderedUsers(users)
        else {
            // search user
            const filteredUsers = users.filter(u => u.fullname.includes(search.name) || u.username.includes(search.name))
            getOrderedUsers(filteredUsers)
        }
    }, [search, users, userToChat])

    useEffect(() => {
        if (userToChat) loadHistory()

    }, [userToChat])

    useEffect(() => {
        if (!userToChat)
            console.log('msgInfo:', msgInfo)
        // Join room
        socketService.emit('chat-set-topic', msgInfo?._id)
        // Add listeners
        socketService.on('chat-add-msg', addMsg)

        socketService.on('user-got-msg', (data) => {
            console.log('user-got-msg!!!!')
        })

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

    useEffect(() => {
        if (!msgInfo?.history) return
        setMsgsToShow(getMsgsOrder(msgInfo?.history))
    }, [msgInfo?.history])

    function goToChat(userId) {
        onToggleSearchModal()
        console.log('go to chat', userId)
    }

    async function getOrderedUsers(users) {
        try {
            const filterBy = { userId: loggedinUser._id }
            const msgs = await msgService.query(filterBy)
            // sort the user msgs by date
            msgs.sort((m1, m2) => m2.history[m2.history.length - 1]?.createdAt - m1.history[m1.history.length - 1]?.createdAt)
            // find the users that have msgs with loggedinUser
            const userIds = msgs.map(m => m.users.find(u => u._id !== loggedinUser._id)._id)
            const orderedUsers = []
            // push the users that have msgs with loggedinUser
            userIds.forEach(id => {
                const userById = users.find(u => u._id === id)
                orderedUsers.push(userById)
            })
            // push all other users
            orderedUsers.push(...users.filter(u => u._id !== loggedinUser._id &&
                userIds.every(userId => userId !== u._id)))
            setUsersToShow(orderedUsers)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function loadHistory() {
    const loggedinUserFull = await userService.getById(loggedinUser._id)
    const userToChatFull = await userService.getById(userToChat._id)
        const msgId = loggedinUserFull.msgsIds.find(id1 => {
            return userToChatFull.msgsIds.find(id2 => {
                return id1 === id2
            })
        })
        if (msgId) {
            const msgInfo = await msgService.getById(msgId)
            setMsgInfo(msgInfo)
            console.log('if msgInfo:', msgInfo)
        } else {
            const { username, fullname, _id, imgUrl } = userToChat
            const miniUserToChat = { username, fullname, _id, imgUrl }
           const msgInfo=await updateUsersMsgId(miniUserToChat)
           console.log('else msgInfo:', msgInfo)
            setMsgInfo(msgInfo)
        }
    }

    function addMsg(newMsg) {
        setMsgInfo(prevMsgInfo => ({ ...prevMsgInfo, history: [...prevMsgInfo.history, newMsg] }))
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const userId = loggedinUser._id
        const msgToSend = { userId, txt: newMsg.txt }
        // the socket update the backend
        socketService.emit('chat-send-msg', msgToSend)
        const toUser = msgInfo.users.find(user => user._id !== userId)
        // update the user who got msg
        socketService.emit('user-got-msg', toUser._id)
        // stop typing
        socketService.emit('chat-stop-typing', userId)
        clearTimeout(timeoutId.current)
        timeoutId.current = null

        setNewMsg({ txt: '' })
    }

    function showTyping(fullname) {
        console.log(fullname, 'is typing')
        setTypingUser(fullname)
    }

    function removeTypingUser() {
        console.log('removeTyping user')
        setTypingUser(null)
    }

    function handleFormChange(ev) {
        const user = {
            _id: loggedinUser._id,
            fullname: loggedinUser.fullname
        }
        if (!timeoutId.current) socketService.emit('chat-user-typing', user)
        if (timeoutId.current) clearTimeout(timeoutId.current)

        timeoutId.current = setTimeout(() => {
            socketService.emit('chat-stop-typing', user)
            timeoutId.current = null
        }, 2000);

        handleNewMsgChange(ev)
    }

    function getMsgsOrder(msgs) {
        if (!msgs) return
        let userId;
        const copy = [...msgs]
        copy.forEach((msg, idx) => {
            if (msg.userId === userId) {
                msg.className = 'middle'
                if (copy[idx + 1]?.userId !== msg.userId || !copy[idx + 1]) msg.className = 'end'
            } else {
                userId = msg.userId
                if (copy[idx + 1]?.userId === msg.userId) msg.className = 'start'
                else msg.className = ''
            }
        });
        return copy
    }

    function updateScroll() {
        var element = (utilService.isMobile()) ? document.querySelector(".chat") : document.querySelector(".right-side")
        if (!element) return
        element.scrollTop = element.scrollHeight + 20;
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
                    <Users users={usersToShow} setUserToChat={setUserToChat} />
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
            <section className="right-side">

                {!userToChat && <div className="content-container">
                    <div className="img-container">
                        <img src={message} />
                    </div>
                    <h2>Your messages</h2>
                    <span>Send private photos and messages to a friend or group</span>
                    <button className="btn">Send message</button>
                </div>}

                {userToChat && <Chat userToChat={userToChat} setUserToChat={setUserToChat} topic={msgInfo?._id} msgs={msgsToShow} loggedinUser={loggedinUser} typingUser={typingUser} sendMsg={sendMsg} handleFormChange={handleFormChange} newMsg={newMsg} updateScroll={updateScroll} />}
            </section>

        </section>
    )
}
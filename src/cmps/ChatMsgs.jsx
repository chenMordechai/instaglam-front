import {useState} from 'react'

export function ChatMsgs({ msgs, loggedinUser, typingUser ,updateScroll}) {
    setTimeout( updateScroll,1)
    function getClassName(userId) {
        return (userId === loggedinUser._id) ? 'loggedin-user' : 'some-user'
    }

    return (
        <section className="chat-msgs">
            <ul>
                {msgs?.map((msg, idx) => (<li className={getClassName(msg.userId) + ' ' + msg.className}
                    key={msg._id}>
                    {msg.txt}
                </li>
                ))}
                {typingUser && <li>{typingUser} is typing...</li>}
                {!typingUser && <li></li>}
            </ul>

        </section>
    )
}


export function ChatMessages({ msgs, loggedinUser, typingUser }) {

    function getClassName(userId) {
        return (userId === loggedinUser._id) ? 'user' : ''
    }

    return (
        <section className="chat-messages">
            <h1>ChatMessages</h1>
            <ul>
                {msgs?.map((msg, idx) => (<li className={getClassName(msg.userId)}
                    key={idx}>
                    {msg.txt}
                </li>
                ))}
                {typingUser && <li>{typingUser} is typing...</li>}
            </ul>

        </section>
    )
}
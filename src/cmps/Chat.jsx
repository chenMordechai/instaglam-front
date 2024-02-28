
import { ChatHeader } from "./ChatHeader";
import { ChatMsgs } from "./ChatMsgs";
import { ChatInput } from "./ChatInput";

// import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC ,SOCKET_EVENT_TYPING,SOCKET_EVENT_STOP_TYPING,SOCKET_EMIT_TYPING,SOCKET_EMIT_STOP_TYPING} from '../services/socket.service'

export function Chat({ userToChat, setUserToChat, topic, msgs, loggedinUser, typingUser, updateScroll, ...restOfProps }) {

    const { imgUrl, fullname } = userToChat
    return (
        <section className="chat">
            <ChatHeader imgUrl={imgUrl} fullname={fullname} setUserToChat={setUserToChat} />
            {msgs && <ChatMsgs msgs={msgs} loggedinUser={loggedinUser} typingUser={typingUser} updateScroll={updateScroll} />}
            <ChatInput {...restOfProps} />

        </section>
    )
}
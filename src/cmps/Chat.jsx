
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function Chat ({userToChat}){

    const {imgUrl , fullname} = userToChat
    return (
        <section className="chat">
            <ChatHeader imgUrl={imgUrl} fullname={fullname}/>
            <ChatMessages/>
            <ChatInput/>

        </section>
    )
}
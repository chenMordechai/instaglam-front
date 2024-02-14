
import smile from '../assets/icons/face-smile-regular.svg'
import microphone from '../assets/icons/microphone.svg'
import image from '../assets/icons/image-regular.svg'
import heart from '../assets/icons/heart-regular.svg'



export function ChatInput({ sendMsg, handleFormChange, newMsg }) {
  
    return (
        <section className="chat-input">
            <div className="form-container">
                <div className="side1">

                <img src={smile}/>
                <form onSubmit={sendMsg}>
                     <input
                    type="text" value={newMsg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" placeholder="Message..." />
                     
                </form>
                    </div>
                    <div className="side2">

                <img src={microphone}/>
                <img src={image}/>
                <img src={heart}/>
                    </div>
            </div>
        </section>
    )
}
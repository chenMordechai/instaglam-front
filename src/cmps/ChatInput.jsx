

export function ChatInput({ sendMsg, handleFormChange, newMsg }) {

    return (
        <section className="chat-input">
            <form onSubmit={sendMsg}>
                <input
                    type="text" value={newMsg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button className="btn ">Send</button>
            </form>
        </section>
    )
}

import arrow from '../assets/icons/angle-down-solid.svg'
import pen from '../assets/icons/pen-to-square-regular.svg'

export function MessageHeader({ username }) {
    return (
        <section className="message-header">
            <div>
                <h2>{username}
                    <img src={arrow} />
                </h2>
                <img className="pen" src={pen} />

            </div>

            <h3>Messages</h3>
        </section>
    )
}
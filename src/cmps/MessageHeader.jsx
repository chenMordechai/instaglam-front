
import arrow from '../assets/icons/arrow-left-long-solid.svg'
import angle from '../assets/icons/angle-down-solid.svg'

export function MessageHeader({ username }) {
    return (
        <section className="message-header">
            <button>
                <img src={arrow} />
            </button>
            <h2>{username}
                <button >
                    <img src={angle} />
                </button>
            </h2>
            <span>

            </span>
        </section >
    )
}
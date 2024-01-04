import logo from '../assets/icons/logo.svg'
import heart from '../assets/icons/heart-regular.svg'
import message from '../assets/icons/message-regular.svg'

export function HomeHeader() {
    return (
        <section className="home-header">
            <button>
            <img className="logo" src={logo} />
            </button>

            <section>
            <a className="disable" title="Notifications" >
            <img src={heart} />
            </a>
            <a className="disable" title="Messages"  >
            <img src={message} />
            </a>
            </section>
        </section>
    )
}
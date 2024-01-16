import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import logo from '../assets/icons/logo.svg'
import heart from '../assets/icons/heart-regular.svg'
import message from '../assets/icons/message-regular.svg'

export function HomeHeader({ newNotifications, loggedinUserId }) {

    // const [isOpenNotification, setIsOpenNotification] = useState(false)

    return (
        <section className="home-header">
            <button>
                <img className="logo" src={logo} />
            </button>

            <section>
                <Link to={'/notification/' + loggedinUserId} title="Notifications" >
                    <img src={heart} />
                    {newNotifications && <FontAwesomeIcon className="have-notification" icon={faCircle} />}
                </Link>
                <a className="disable" title="Messages"  >
                    <img src={message} />
                </a>
            </section>
        </section>
    )
}
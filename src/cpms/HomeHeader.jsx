import { Link } from "react-router-dom";

import logo from '../assets/icons/logo.svg'
import heart from '../assets/icons/heart-regular.svg'
import message from '../assets/icons/message-regular.svg'

export function HomeHeader({loggedinUserId}) {
    return (
        <section className="home-header">
            <button>
            <img className="logo" src={logo} />
            </button>

            <section>
            <Link to={'/notification/'+loggedinUserId} title="Notifications" >
                 <img src={heart} />
            </Link>
            <a className="disable" title="Messages"  >
              <img src={message} />
            </a>
            </section>
        </section>
    )
}
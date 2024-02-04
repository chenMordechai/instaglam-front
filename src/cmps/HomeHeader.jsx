import { memo } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import logo from '../assets/icons/logo.svg'
import heart from '../assets/icons/heart-regular.svg'
import message from '../assets/icons/message-regular.svg'
import { Notification } from '../pages/Notification'
import { useToggle } from '../customHooks/useToggle'

export const HomeHeader = memo(({ newNotifications, loggedinUserId }) => {
    const [openNotificationModal, onToggleNotificationModal] = useToggle(false)

    return (
        <section className="home-header">
            {openNotificationModal && <Notification loggedinUserId={loggedinUserId} onToggleNotificationModal={onToggleNotificationModal} />}
            {!openNotificationModal && <><button>
                <img className="logo" src={logo} />
            </button>

            <section className="icons">
                <a onClick={onToggleNotificationModal} title="Notifications" >
                    <img src={heart} />
                    {newNotifications && <FontAwesomeIcon className="have-notification" icon={faCircle} />}
                </a>
                <Link to="/message" className="disable" title="Messages"  >
                    <img src={message} />
                </Link>
            </section></>}
        </section>
    )
})
import { memo } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import logo from '../assets/icons/logo.svg'
import heart from '../assets/icons/heart-regular.svg'
import message from '../assets/icons/message-regular.svg'
import arrow from '../assets/icons/angle-down-solid.svg'

import { Notification } from '../pages/Notification'
import { useToggle } from '../customHooks/useToggle'

export const HomeHeader = memo(({ newNotifications, loggedinUserId }) => {
    const [openNotificationModal, onToggleNotificationModal] = useToggle(false)

    return (
        <section className="home-header">
            {openNotificationModal && <Notification loggedinUserId={loggedinUserId} onToggleNotificationModal={onToggleNotificationModal} />}
            {!openNotificationModal && <><button className="logo">
                <img  src={logo} />
                <img src={arrow} />
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
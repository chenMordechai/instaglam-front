import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import instagram from '../assets/icons/instagram.svg'
import compass from '../assets/icons/compass-regular.svg'
import heart from '../assets/icons/heart-regular.svg'
import message from '../assets/icons/message-regular.svg'
import plus from '../assets/icons/square-plus-regular.svg'
import house from '../assets/icons/house-solid.svg'
// import house from '../assets/icons/home.png'
import glass from '../assets/icons/glass-solid.svg'
import film from '../assets/icons/film-solid.svg'
import bars from '../assets/icons/bars-solid.svg'
import logo from '../assets/icons/logo.svg'

import { Notification } from '../pages/Notification'
import { Search } from '../pages/Search'
import { Img } from './Img'
import { socketService } from '../services/socket.service.js'
import { useToggle } from '../customHooks/useToggle'
import { useEffectToggleModal } from '../customHooks/useEffectToggleModal'
import { useEffectCloseModal } from '../customHooks/useEffectCloseModal'

export function NavLinks({ isScreenOpen, onOpenScreen, onCloseScreen, navLinksDisplay }) {
    const { loggedinUser } = useSelector(storeState => storeState.userModule)

    const [openNotificationModal, onToggleNotificationModal] = useToggle(false)
    const [openSearchModal, onToggleSearchModal] = useToggle(false)

    const notifications = useSelector(storeState => storeState.userModule.currUser?.notifications)
    const [newNotifications, setNewNotifications] = useState(false)

    useEffect(() => {
        socketService.emit('user-watch', loggedinUser?._id)
        socketService.on('notification-added', () => {
            setNewNotifications(true)
        })

    }, [notifications])

    useEffect(() => {
        if (openNotificationModal) {
            setNewNotifications(false)
        }
    }, [openNotificationModal])


    useEffectToggleModal(onOpenScreen, onCloseScreen, [openNotificationModal, openSearchModal])

    useEffectCloseModal(isScreenOpen, [onToggleNotificationModal, onToggleSearchModal])


    function isMobile() {
        return (window.innerWidth > 700) ? false : true
    }


    if (!loggedinUser) return ''
    return (

        <section className="nav-links" style={{ 'display': navLinksDisplay }}>
            <Link to={'/home'} title="Instaglam" className="not-mobile">
                <img className="icon" src={instagram} />
                <img className="logo" src={logo} />
            </Link>
            <NavLink to={'/home'} title="Home" >
                <img src={house} />
                <span>Home</span>
            </NavLink>
            {isMobile() && <NavLink to="search" title="Search" >
                <img src={glass} />
                <span>Search</span>
            </NavLink>}
            {!isMobile() && <a onClick={onToggleSearchModal} title="Search" >
                {/* <FontAwesomeIcon icon={faHeart} /> */}
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                <img src={glass} />
                <span>Search</span>
            </a>}
            <a className="disable not-mobile" title="Explore" >
                <img src={compass} />
                <span>Explore</span>
            </a>
            <NavLink to="video" title="Reels" >
                <img src={film} />
                <span>Reels</span>
            </NavLink>
            <NavLink to="message" className="disable not-mobile" title="Messages"  >
                <img src={message} />
                <span>Messages</span>
            </NavLink>
            <a onClick={onToggleNotificationModal} className="not-mobile" title="Notifications" >
                {!openNotificationModal && <img src={heart} />}
                {openNotificationModal && <FontAwesomeIcon icon={faHeart} />}
                {newNotifications && <FontAwesomeIcon className="have-notification" icon={faCircle} />}

                <span>Notifications</span>
            </a>
            <NavLink to={'/post/edit'} title="New Post">
                <img src={plus} />
                <span >Create</span>
            </NavLink>
            <NavLink to={`/profile/${loggedinUser._id}/posts`} title="Profile">
                <div className="img-container">
                    <Img imgUrl={loggedinUser.imgUrl} className="regular" />
                </div>
                <span>Profile</span>
            </NavLink>
            <a className="disable not-mobile" title="More"  >
                <img src={bars} />
                <span>More</span>
            </a>


            {openNotificationModal && <Notification loggedinUserId={loggedinUser._id} />}
            {openSearchModal && <Search />}
        </section>
    )
}
import { useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMagnifyingGlass, faCommentDots, faHouse, faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import instagram from '../assets/icons/instagram.svg'
import compass from '../assets/icons/compass-regular.svg'
import heart from '../assets/icons/heart-regular.svg'
import message from '../assets/icons/message-regular.svg'
import plus from '../assets/icons/square-plus-regular.svg'
// import house from '../assets/icons/house-solid.svg'
// import house from '../assets/icons/home3.png'
import homeBorder from '../assets/icons/house.png'
import homeFull from '../assets/icons/house-full.png'
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
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    const [openNotificationModal, onToggleNotificationModal] = useToggle(false)
    const [openSearchModal, onToggleSearchModal] = useToggle(false)

    const notifications = useSelector(storeState => storeState.userModule.currUser?.notifications)
    const [newNotifications, setNewNotifications] = useState(false)

    useEffectToggleModal(onOpenScreen, onCloseScreen, [openNotificationModal, !isMobile() && openSearchModal])
    useEffectCloseModal(isScreenOpen, [onToggleNotificationModal, onToggleSearchModal])

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

    const location = useLocation();

    function isMessagePage() {
        return location.pathname === '/message'
    }

    function isHomePage() {
        return location.pathname === '/home'
    }

    function isProfilePage() {
        return location.pathname.includes('/profile')
    }

    function isMobile() {
        return !(window.innerWidth > 700)
    }

    function getStyle() {
        const style = { 'display': navLinksDisplay }
        if (openSearchModal || openNotificationModal) style['zIndex'] = 10
        return style
    }

    function getClass() {
        if (openSearchModal || openNotificationModal) return 'close-nav'
        else return ''
    }

  

    if (!loggedinUser) return ''
    return (

        <section className={`nav-links ${getClass()}`} style={getStyle()}>

            <Link to={'/home'} title="Instaglam" className="not-mobile">
                <img className="icon" src={instagram} />
                <img className="logo" src={logo} />
            </Link>
            <NavLink to={'/home'} title="Home" >
                {/* <img src={homeFull} /> */}
                {/* <FontAwesomeIcon icon={faHouse} />
                <FontAwesomeIcon icon={faHouseChimney} /> */}
                {!isHomePage() && <img src={homeBorder} />}
                {isHomePage() && <img src={homeFull} />}
                <span>Home</span>
            </NavLink>

            <a onClick={onToggleSearchModal} title="Search" >
                {/* <FontAwesomeIcon icon={faHeart} /> */}
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                <img src={glass} />
                <span>Search</span>
            </a>
            <a className="disable not-mobile" title="Explore" >
                <img src={compass} />
                <span>Explore</span>
            </a>
            <NavLink to="video" title="Reels" >
                <img src={film} />
                <span>Reels</span>
            </NavLink>
            <NavLink to="message" className="not-mobile" title="Messages"  >
                {!isMessagePage() && <img src={message} />}
                {isMessagePage() && <FontAwesomeIcon icon={faCommentDots} />}
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
                <div className="img-container" style={isProfilePage() ? { 'outline': '2px solid black' } : {}}>
                    <Img imgUrl={loggedinUser.imgUrl} className="regular" />
                </div>
                <span>Profile</span>
            </NavLink>
            <a className="disable not-mobile" title="More"  >
                <img src={bars} />
                <span>More</span>
            </a>

            {openNotificationModal && <Notification loggedinUserId={loggedinUser._id} />}
            {openSearchModal && <Search onToggleSearchModal={onToggleSearchModal} />}
        </section>
    )
}
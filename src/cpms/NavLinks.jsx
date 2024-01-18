import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import instagram from '../assets/icons/instagram.svg'
import compass from '../assets/icons/compass-regular.svg'
import heart from '../assets/icons/heart-regular.svg'
import message from '../assets/icons/message-regular.svg'
import plus from '../assets/icons/square-plus-regular.svg'
import house from '../assets/icons/house-solid.svg'
import glass from '../assets/icons/glass-solid.svg'
import film from '../assets/icons/film-solid.svg'
import bars from '../assets/icons/bars-solid.svg'
import logo from '../assets/icons/logo.svg'


import { Notification } from '../pages/Notification'
import { Search } from '../pages/Search'
import { Img } from './Img'
import { socketService } from '../services/socket.service.js'

export function NavLinks({ navLinksDisplay }) {
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    const [openNotificationModal, setOpenNotificationModal] = useState(false)
    const [openSearchModal, setOpenSearchModal] = useState(false)

    const notifications = useSelector(storeState => storeState.userModule.currUser?.notifications)
// console.log('notifications from the nav side:', notifications)
// console.log(notifications[0].seen)
// console.log(notifications[notifications.length-1].seen)
    const [newNotifications, setNewNotifications] = useState(false)

    useEffect(() => {
        // console.log('useEffect nav links')
        // const notSeen = notifications?.some(n => !n.seen)
        // console.log('notSeen:', notSeen)
        // if (notSeen) setNewNotifications(true)

        socketService.emit('user-watch', loggedinUser?._id)
        socketService.on('notification-added', () => {
            setNewNotifications(true)
        })

    }, [notifications])

    useEffect(()=>{
        if(openNotificationModal)  {
            setNewNotifications(false)
        }
    },[openNotificationModal])

    function onToggleNotificationModal() {
        if (openSearchModal) onToggleSearchModal()
        setOpenNotificationModal(prev => !prev)
    }

    function onToggleSearchModal() {
        if (openNotificationModal) onToggleNotificationModal()
        setOpenSearchModal(prev => !prev)
    }

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
            {isMobile() && <Link to="search" title="Search" >
                <img src={glass} />
                <span>Search</span>
            </Link>}
            {!isMobile() && <a onClick={onToggleSearchModal} title="Search" >
                <img src={glass} />
                <span>Search</span>
            </a>}
            <a className="disable not-mobile" title="Explore" >
                <img src={compass} />
                <span>Explore</span>
            </a>
            <Link to="video"  title="Reels" >
                <img src={film} />
                <span>Reels</span>
            </Link>
            <a className="disable not-mobile" title="Messages"  >
                <img src={message} />
                <span>Messages</span>
            </a>
            <a onClick={onToggleNotificationModal} className="not-mobile" title="Notifications" >
                {!openNotificationModal && <img src={heart} />}
                {openNotificationModal && <FontAwesomeIcon icon={faHeart} />}
                {newNotifications && <FontAwesomeIcon className="have-notification" icon={faCircle} />}

                <span>Notifications</span>
            </a>
            <Link to={'/post/edit'} title="New Post">
                <img src={plus} />
                <span >Create</span>
            </Link>
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
import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

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

import {Notification} from '../pages/Notification'

import { Img } from './Img'

export function NavLinks({ navLinksDisplay }) {
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    const [openNotificationModal, setOpenNotificationModal] = useState(false)


        
    function onToggleNotificationModal() {
        setOpenNotificationModal(prev => !prev)
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
            <a className="disable" title="Search" >
                <img src={glass} />
                <span>Search</span>
            </a>
            <a className="disable not-mobile" title="Explore" >
                <img src={compass} />
                <span>Explore</span>
            </a>
            <a className="disable" title="Reels" >
                <img src={film} />
                <span>Reels</span>
            </a>
            <a className="disable not-mobile" title="Messages"  >
                <img src={message} />
                <span>Messages</span>
            </a>
            <a onClick={onToggleNotificationModal} className="not-mobile" title="Notifications" >
               { !openNotificationModal &&<img src={heart} />}
                {openNotificationModal &&  <FontAwesomeIcon icon={faHeart} />}
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


           {openNotificationModal && <Notification loggedinUserId={loggedinUser._id}/>}
        </section>
    )
}
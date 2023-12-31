import { NavLink, Link } from "react-router-dom";

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

import { Img } from './Img'

export function NavLinks() {
    return (
        // <NavLink to={'/'} >Home</NavLink>

        <section className="nav-links">
            <Link to={'/'} title="Instaglam" className="not-mobile">
                <img className="icon" src={instagram} />
                <img className="logo" src={logo} />
            </Link>
            <NavLink to={'/'} title="Home" >
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
            <a className="disable not-mobile" title="Notifications" >
                <img src={heart} />
                <span>Notifications</span>
            </a>
            <a className="disable" title="New Post" >
                <img src={plus} />
                <span>Create</span>
            </a>
            <NavLink to={'/profile/658dee34df19d32496f22f64'} title="Profile">
                <div className="img-container">
                    <Img isGradient={false} />
                </div>
                <span>Profile</span>
            </NavLink>
            <a className="disable not-mobile" title="More"  >
                <img src={bars} />
                <span>More</span>
            </a>
        </section>
    )
}
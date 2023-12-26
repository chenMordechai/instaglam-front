import { NavLink , Link } from "react-router-dom";

import instagram from '../assets/icons/instagram.svg'
import compass from '../assets/icons/compass-regular.svg'
import heart from '../assets/icons/heart-regular.svg'
import plus from '../assets/icons/square-plus-regular.svg'
import message from '../assets/icons/message-regular.svg'
import house from '../assets/icons/house-solid.svg'
import glass from '../assets/icons/glass-solid.svg'
import film from '../assets/icons/film-solid.svg'
import bars from '../assets/icons/bars-solid.svg'
import logo from '../assets/icons/logo.svg'

export function NavLinks() {
    return (
        // <NavLink to={'/'} >Home</NavLink>

        <section className="nav-links">
            <Link to={'/'} title="Instaglam" >
            <img className="icon" src={instagram} />
            <img className="logo" src={logo} />
            </Link>
            <NavLink to={'/'} title="Home" >
            <img src={house} />
            <span>Home</span>
            </NavLink>
            <a className="disable" title="Search">
            <img src={glass} />
            <span>Search</span>
            </a>
            <a className="disable" title="Explore" href="">
            <img src={compass} />
            <span>Explore</span>
            </a>
            <a className="disable" title="Reels" href="">
            <img src={film} />
            <span>Reels</span>
            </a>
            <a className="disable" title="Messages" href="">
            <img src={message} />
            <span>Messages</span>
            </a>
            <a className="disable" title="Notifications" href="">
            <img src={heart} />
            <span>Notifications</span>
            </a>
            <a className="disable" title="New Post" href="">
            <img src={plus} />
            <span>Create</span>
            </a>
            <NavLink to={'/profile'} title="Profile" href="">
            {/* <span>img</span> */}
            <span>Profile</span>
            </NavLink>
            <a className="disable" title="More" href="">
            <img src={bars} />
            <span>More</span>
            </a>               
        </section>
    )
}
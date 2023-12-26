import instagram from '../assets/icons/instagram.svg'
import compass from '../assets/icons/compass-regular.svg'
import heart from '../assets/icons/heart-regular.svg'
import plus from '../assets/icons/square-plus-regular.svg'
import message from '../assets/icons/message-regular.svg'
import house from '../assets/icons/house-solid.svg'
import glass from '../assets/icons/glass-solid.svg'
import film from '../assets/icons/film-solid.svg'
import bars from '../assets/icons/bars-solid.svg'

export function NavLinks() {
    return (
        <section className="nav-links">
            <a title="Instaglam" href="">
            <img src={instagram} />
            </a>
            <a title="Home" href="">
            <img src={house} />
            </a>
            <a title="Search" href="">
            <img src={glass} />
            </a>
            <a  title="Explore" href="">
            <img src={compass} />
            </a>
            <a title="Reels" href="">
            <img src={film} />
            </a>
            <a title="Messages" href="">
            <img src={message} />
            </a>
            <a title="Notifications" href="">
            <img src={heart} />
            </a>
            <a title="New Post" href="">
            <img src={plus} />
            </a>
            <a title="Profile" href="">
            {/* <span>img</span> */}
            </a>
            <a title="More" href="">
            <img src={bars} />
            </a>               
        </section>
    )
}
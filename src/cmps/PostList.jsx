import { Outlet, NavLink } from 'react-router-dom'
import grid from '../assets/icons/table-cells-solid.svg'
import image from '../assets/icons/image-regular.svg'
// import bookmark from '../assets/icons/bookmark-regular.svg'
import bookmark from '../assets/icons/bookmark-regular.png'
import { utilService } from '../services/util.service.js'

export function PostList({ isLoggedinUserProfile, userId, postsMini }) {
  
    return (
        <section className="post-list">
            <nav>
                <NavLink to={`/profile/${userId}/posts`} >
                    <img src={grid} />
                    <span>Posts</span>
                </NavLink>
                {isLoggedinUserProfile && !utilService.isMobile() &&
                <NavLink to={`/profile/${userId}/saved`}>
                    <img src={bookmark} />
                    <span>Saved</span>
                </NavLink>}
                <NavLink to={`/profile/${userId}/tagged`}>
                    <img src={image} />
                    <span>Tagged</span>
                </NavLink>
            </nav>
            <section>
                <Outlet context={postsMini} />
            </section>
        </section>
    )
}
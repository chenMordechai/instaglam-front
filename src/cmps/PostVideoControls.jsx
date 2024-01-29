import { NavLink, Link } from "react-router-dom";

import heart from '../assets/icons/heart-regular.svg'
import comment from '../assets/icons/comment-regular.svg'
import arrow from '../assets/icons/share-from-square-regular.svg'
import bookmark from '../assets/icons/bookmark-regular.svg'
import ellipsis from '../assets/icons/ellipsis-solid.svg'

import { Img } from './Img'
import {Heart} from './Heart'

export function PostVideoControls({ by}) {
   
    return (
        <section className="post-video-controls" >
            <button title="Like">
            <Heart />
            {/* <Heart onUpdateLike={onUpdateLikePost} loggedinUser={loggedinUser} likedBy={likedBy}/> */}
                <span></span>
            </button>
            <button title="Comment">
                <img src={comment} />
                <span></span>
            </button>
            <button title="Direct">
                <img src={arrow} />
            </button>
            <button title="Save">
                <img src={bookmark} />
            </button>
            <button title="Save">
                <img src={ellipsis} />
            </button>
            <NavLink to={`/profile/${by._id}/posts`} title="Profile">
                <div className="img-container">
                    <Img imgUrl={by.imgUrl} className="regular" />
                </div>
            </NavLink>
        </section>
    )
}
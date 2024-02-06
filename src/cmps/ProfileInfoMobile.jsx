import { NavLink, Link } from "react-router-dom";

import ellipsis from '../assets/icons/ellipsis-solid.svg'
import user from '../assets/icons/user-plus-solid.svg'
import gear from '../assets/icons/gear.png'
import arrow from '../assets/icons/angle-down-solid.svg'

import userImg from '../assets/icons/user.jpg'
import { Img } from './Img'
import { utilService } from '../services/util.service'

export function ProfileInfoMobile ({ onToggleShowImgModal, onToggleFollowingModal, onAddFollowing, isFollowing, userId, isLoggedinUserProfile, onToggleChangeImgModal, onTogglePreferencesModal, username, fullname, imgUrl, bio, postsLength, followers, followingLength }){
    
    function getClass() {
        if (!bio) return ''
        const res = utilService.isHebrew(bio)
        if (res) return 'rtl'
        else ''
    }

    function onClickImg() {
        if (isLoggedinUserProfile) {
            onToggleChangeImgModal()
        } else {
            onToggleShowImgModal()
        }
    }
    
    return (
        <section className="profile-info-mobile">
            <div className="info-header">
                <div onClick={onClickImg} className="img-container">
                    <Img imgUrl={imgUrl} className="" />
                </div>
                <div className="user-info-dash-board">
                    <div><span>{postsLength}</span><span> posts</span></div>
                    <div><span>{followers.length}</span> <span>followers</span></div>
                    <div><span>{followingLength}</span> <span> following</span></div>
                </div>
            </div>

           <div className="user-description">
                <h3>{fullname}</h3>
                <pre className={getClass()}>{bio}</pre>
                {!isLoggedinUserProfile && <h4>followed by {followers.map(f => <span key={f._id}> {f.username}</span>).slice(0, 2)} and more...</h4>}
           </div>

           <div className="btn-container">
              { !isLoggedinUserProfile && <> 
                {isFollowing && <button onClick={onToggleFollowingModal}
                    className="btn">
                    Following
                    <img src={arrow} />
                </button>}
                {!isFollowing && <button onClick={onAddFollowing}
                    className="btn follow">
                    Follow
                </button>}
                </>}
                {isLoggedinUserProfile &&  <button className="btn">
                            <Link to={'/user/edit/' + userId} >
                                Edit profile
                            </Link>
                        </button>}
               {!isLoggedinUserProfile && <button className="btn">Message</button>}
               {isLoggedinUserProfile && <button className="btn">Share profile</button>}
                <button className="btn user"><img src={user} /></button>

            </div>

        </section>
    )
}
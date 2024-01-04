import { NavLink, Link } from "react-router-dom";

import ellipsis from '../assets/icons/ellipsis-solid.svg'
import user from '../assets/icons/user-plus-solid.svg'
import gear from '../assets/icons/gear-solid.svg'
import userImg from '../assets/icons/user.jpg'
import { Img } from './Img'
import { utilService } from '../services/util.service'


export function ProfileInfo({ userId, isLoggedinUserProfile, onToggleChangeImgModal, onTogglePreferencesModal, username, fullname, imgUrl, description, postsLength, followersLength, followingLength }) {

    function getClass() {
        if (!description) return ''
        const res = utilService.isHebrew(description.charAt(1))
        if (res) return 'rtl'
        else ''
    }


    return (
        <section className="profile-info">
            <div className="left-container">
                <div onClick={onToggleChangeImgModal} className="img-container">
                        <Img imgUrl={imgUrl} className="gradient" />
                </div>
            </div>
            <div className="user-info">
                {/* אם מישו נכנס לפרופיך שלו ישפה דברים שונים */}
                <div className="user-info-header">
                    <h2>{username}</h2>
                    {!isLoggedinUserProfile && <div className="btn-container">
                        {/* תלןי אם הם חברים או לא */}
                        <button className="btn">Following</button>
                        {/* <button className="btn">Follow</button>  */}
                        <button className="btn">Message</button>
                        <button className="btn"><img src={user} /></button>

                    </div>}
                    {isLoggedinUserProfile && <div className="btn-container">
                        <button className="btn">
                            <Link to={'/user/edit/' + userId} >
                                Edit profile
                            </Link>
                        </button>
                        <button className="btn">View archive</button>
                        <button className="gear" onClick={onTogglePreferencesModal}><img src={gear} /></button>
                    </div>}
                </div>
                <div className="user-info-dash-board">
                    <h3><span>{postsLength}</span> posts</h3>
                    <h3><span>{followersLength}</span> followers</h3>
                    <h3><span>{followingLength}</span> following</h3>
                </div>
                <div className="user-description">
                    <h3>{fullname}</h3>
                    <pre className={getClass()}>{description}</pre>
                    <h4>followed by <span> some name שהם חברים משותפים</span></h4>
                </div>
            </div>
        </section>
    )
}

import { Img } from './Img'
import ellipsis from '../assets/icons/ellipsis-solid.svg'
import user from '../assets/icons/user-plus-solid.svg'

export function ProfileInfo( { username, fullname, imgUrl, description, postsLength, followersLength ,followingLength}) {
    console.log(' postsLength, followersLength ,followingLength:',  postsLength, followersLength ,followingLength)
    return (
        <section className="profile-info">
            <div className="left-container">

                <div className="img-container">
                <Img imgUrl={imgUrl} isGradient={true}/>
                </div>
            </div>
            <div className="user-info">
                {/* אם מישו נכנס לפרופיך שלו ישפה דברים שונים */}
            <div className="user-info-header">
                <h2>{username}</h2>
                <div className="btn-container">
                {/* תלןי אם הם חברים או לא */}
                <button className="btn">Following</button> 
                {/* <button className="btn">Follow</button>  */}
                <button className="btn">Message</button>
                <button className="btn"><img src={user} /></button>
                <button><img src={ellipsis} /></button>
                </div>
            </div>
            <div className="user-info-dash-board">
                <h3><span>{postsLength}</span> posts</h3>
                <h3><span>{followersLength}</span> followers</h3>
                <h3><span>{followingLength}</span> following</h3>
            </div>
            <div className="user-description">
                <h3>{fullname}</h3>
                <pre>{description}</pre>
                <h4>followed by <span> some name שהם חברים משותפים</span></h4>
            </div>
            </div>
        </section>
    )
}
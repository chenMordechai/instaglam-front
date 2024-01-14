import {Img} from './Img'
import star1 from '../assets/icons/star-solid.svg'
import star2 from '../assets/icons/star-regular.svg'
import chevron from '../assets/icons/chevron-right-solid.svg'
import xmark from '../assets/icons/xmark-solid.svg'


export function FollowingModal ({username,imgUrl,onRemoveFollowing}){
   
    return (
        <section className="modal">
            <header>
            <img src={xmark} />
                <div className="img-container">
                <Img imgUrl={imgUrl}></Img>
                </div>
                <h3>{username}</h3>
            </header>
            <div>
                <span>Add to Close Frinds list</span>
                <span><img src={star1} /></span></div>
            <div>
                <span> Add to favorites</span>
               <span><img src={star2} /></span>
            </div>
            <div>
               <span>Mute</span> 
               <span><img src={chevron} /></span>
            </div>
            <div>
               <span>Restrict</span>
                <span><img src={chevron} /></span>
            </div>
            <div onClick={onRemoveFollowing}>
               <span>Unfollow</span>
               <span></span>
                </div>
        </section>
    )
}
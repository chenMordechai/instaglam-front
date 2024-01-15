import { Link } from "react-router-dom"

import { Img } from '../cpms/Img'
import { utilService } from '../services/util.service'

export function NotificationPreview ({userImgUrl ,userId , username ,action,timeStamp, isButton , postImgUrl}){
    function getRandomClass(){
        return (Math.random > 0.5)?'gradient':'grey'
      }
      function getRelativeDate(createdAt) {
        return utilService.timeDifference(Date.now(), createdAt)
      }

       

  function getStyle(postImgUrl) {

    return {
        backgroundImage: `url(${postImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // filter: postImgFilter
    }
}

    return (
        <section className="notification-preview">
              <div className="img-container">
            <Img imgUrl={userImgUrl} className={getRandomClass()}/>
            </div>

            <div className="content-container">

           <Link to={`/profile/${userId}/posts`}>
           {username}
           </Link> 

           <span>{action}</span> 

           <span>{getRelativeDate(timeStamp)}</span> 
            
            </div>

<div className="left-container">

           {isButton && <button className="btn">Following</button>}

           {postImgUrl && <div className="post-img" style={getStyle(postImgUrl)}/>}
         
</div>
        </section>
    )

}
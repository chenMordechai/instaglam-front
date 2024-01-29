
import msg from '../assets/icons/comment-regular.svg'
import arrow from '../assets/icons/arrow-up-right.svg'
import bookmark from '../assets/icons/bookmark-regular.svg'
import {Heart} from './Heart'

export function PostControls({ onUpdateLikePost, loggedinUser , likedBy }) {
  
    return (
        <section className="post-controls">
            <div className="icons-container">
                <div>
                    <Heart onUpdateLike={onUpdateLikePost} loggedinUser={loggedinUser} likedBy={likedBy}/>
                    {/* <a onClick={onLikePost} className={isLiked ? 'red-heart' : ''}>
                        <img src={heart} />
                        <FontAwesomeIcon className={isLiked ? 'animate__heartBeat' : ''} icon={faHeart} />
                    </a> */}
                    <a>
                        <img src={msg} />
                    </a>
                    <a>
                        <img src={arrow} />
                    </a>
                </div>
                <a>
                    <img className="last" src={bookmark} />
                </a>
            </div>
            
        </section>
    )
}


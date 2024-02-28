
import msg from '../assets/icons/comment-regular.svg'
import arrow from '../assets/icons/arrow-up-right.svg'
import share from '../assets/icons/message.png'
// import share from '../assets/icons/share-icon.png'
import bookmark from '../assets/icons/bookmark-regular.png'
// import bookmark from '../assets/icons/bookmark.png'
import { Heart } from './Heart'

export function PostControls({ onUpdateLikePost, loggedinUser, likedBy, onToggleCommentModal }) {

    return (
        <section className="post-controls">
            <div className="icons-container">
                <div>
                    <Heart onUpdateLike={onUpdateLikePost} loggedinUser={loggedinUser} likedBy={likedBy} />
                    <a>
                        <img src={msg} onClick={onToggleCommentModal} />
                    </a>
                    <a>
                        <img src={share} />
                    </a>
                </div>
                <a>
                    <img className="last" src={bookmark} />
                </a>
            </div>

        </section>
    )
}


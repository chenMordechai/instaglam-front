import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faFlag } from '@fortawesome/free-solid-svg-icons'

import line from '../assets/icons/line.png'
import bookmark from '../assets/icons/bookmark-regular.png'
import rotate from '../assets/icons/rotate-solid.svg'
import qrcode from '../assets/icons/qrcode-solid.svg'
import clock from '../assets/icons/time.png'
import heart from '../assets/icons/heart-slash.png'
import comment from '../assets/icons/comment-slash.png'
import pencil from '../assets/icons/pencil.png'
import star from '../assets/icons/star-regular.svg'
import unfollow from '../assets/icons/unfollow.png'
import i from '../assets/icons/i.png'
import hide from '../assets/icons/hide.png'
import user from '../assets/icons/circle-user-regular.svg'
import report from '../assets/icons/report.png'


export function PostOptionsModal({ userId, isFollowing, onRemovePost, onToggleOptionsModal, isLoggedinUserPost, postId }) {


    return (
        <section className="modal post-options-modal">
            <div className="modal-header">
                <img onClick={onToggleOptionsModal} className="line" src={line} />
                <div className="actions-container">
                    <div className="action">
                        <div className="img-container">
                            <img src={bookmark} />
                        </div>
                        <span>Save</span>
                    </div>
                    {/* {isLoggedinUserPost && <div className="action">
                        <div className="img-container">
                            <img src={rotate} />
                        </div>
                        <span>Remix</span>
                    </div>} */}
                    <div className="action">
                        <div className="img-container">
                            <img src={qrcode} />
                        </div>
                        <span>QR code</span>
                    </div>
                </div>
            </div>

            {isLoggedinUserPost && <>
                <button className="option-container">
                    <img src={clock} />
                    Archive
                </button>
                <button className="option-container">
                    <img src={heart} />
                    Hide like count
                </button>
                <button className="option-container">
                    <img src={comment} />
                    Turn off commenting
                </button>
                <Link className="option-container" to={`/post/edit/${postId}`}>
                    <img src={pencil} />
                    Edit
                </Link>
                <button onClick={() => onRemovePost()} className="clr-red option-container">
                    <FontAwesomeIcon icon={faTrashCan} />
                    Delete
                </button>
            </>}

            {!isLoggedinUserPost && <>
                <button className="option-container">
                    <img src={star} />
                    Add to favorite
                </button>
                <button className="option-container">
                    <img src={unfollow} />
                    Unfollow
                </button>
                <button className="option-container">
                    <img src={i} />
                    Why you're seeing this post
                </button>
                <button className="option-container">
                    <img src={hide} />
                    Hide
                </button>
                <Link className="option-container" to={`/profile/${userId}/posts`} >
                    <img src={user} />
                    About this account
                </Link>
                <button className="clr-red option-container">
                    <FontAwesomeIcon icon={faFlag} />
                    Report
                </button>
            </>}


        </section>
    )
}
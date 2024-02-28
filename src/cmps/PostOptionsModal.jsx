import { Link } from "react-router-dom";
import line from '../assets/icons/line.png'
import bookmark from '../assets/icons/bookmark-regular.png'
import rotate from '../assets/icons/rotate-solid.svg'
import qrcode from '../assets/icons/qrcode-solid.svg'
import clock from '../assets/icons/time.png'
import heart from '../assets/icons/heart-slash.png'
import comment from '../assets/icons/comment-slash.png'
import pencil from '../assets/icons/pencil.png'
import trash from '../assets/icons/trash.png'

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
                    <img src={trash} />
                    Delete
                </button>
            </>}

            {!isLoggedinUserPost &&
                <Link to={`/profile/${userId}/posts`} >
                    About this account
                </Link>}


        </section>
    )
}
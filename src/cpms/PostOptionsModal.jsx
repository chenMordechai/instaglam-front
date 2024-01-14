import { Fragment } from 'react'
import { Link } from "react-router-dom";

export function PostOptionsModal({isFollowing, onRemovePost, onToggleOptionsModal, isLoggedinUserPost, postId }) {
   console.log('isFollowing:', isFollowing)
    return (
        <section className="modal">
            {!isLoggedinUserPost && <Fragment>
                {/* <button className="red bold">Unfollow</button> */}
                <button>About this account</button>
            </Fragment>}

            <button>Add to favorites</button>
            <button>Go to post</button>
            <button>Share to..</button>
            <button>Copy Link</button>
            <button>Save</button>

            {isLoggedinUserPost && <Fragment>
                <button>
                    <Link to={`/post/edit/${postId}`}>
                        Edit
                    </Link>
                </button>
                <button>Archive</button>
                <button onClick={() => onRemovePost()} className="red">
                    Delete
                </button>
            </Fragment>}

            <button onClick={onToggleOptionsModal} >Cancel</button>

        </section>
    )
}
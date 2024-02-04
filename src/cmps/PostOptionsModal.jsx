import { Link } from "react-router-dom";

export function PostOptionsModal({ userId, isFollowing, onRemovePost, onToggleOptionsModal, isLoggedinUserPost, postId }) {


    return (
        <section className="modal">
            {!isLoggedinUserPost &&
                <Link to={`/profile/${userId}/posts`} >
                    About this account
                </Link>}

            <button className="doesnt-work">Add to favorites</button>
            <button className="doesnt-work">Go to post</button>
            <button className="doesnt-work">Share to..</button>
            <button className="doesnt-work">Copy Link</button>
            <button className="doesnt-work">Save</button>

            {isLoggedinUserPost && <>

                <button className="doesnt-work">Archive</button>
                <Link to={`/post/edit/${postId}`}>
                    Edit
                </Link>

                <button onClick={() => onRemovePost()} className="clr-red">
                    Delete
                </button>
            </>}

            <button onClick={onToggleOptionsModal} >Cancel</button>

        </section>
    )
}
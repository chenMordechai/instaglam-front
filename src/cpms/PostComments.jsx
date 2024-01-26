import { useState } from 'react'
import { NavLink, Link } from "react-router-dom";

import { postService } from '../services/post.service'
import { Img } from './Img'
import { utilService } from '../services/util.service'

export function PostComments({ loggeginUserImgUrl, onToggleCommentModal, comments, myNewComment, onAddCommentToPost, by, byId, likedBy, txt }) {
    const [comment, setComment] = useState(postService.getEmptyComment())

    function handleChange(ev) {
        let { value, name } = ev.target
        setComment(prevComment => ({ ...prevComment, [name]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onAddCommentToPost(comment)
        setComment(postService.getEmptyComment())
    }

    function getClass() {
        if (!txt) return
        const res = utilService.isHebrew(txt)
        if (res) return 'rtl'
        else ''
    }
    return (
        <section className="post-comments">
            <h3>{likedBy.length} likes</h3>
            {/* <a>{by} <span>{txt}</span></a> */}
            <Link className="new-comment" to={'/profile/' + byId + '/posts'} >
                {by}
                <span className={getClass()}>{txt}</span>
            </Link>
            <button onClick={onToggleCommentModal} className="clr-grey">View all {comments.length} comments</button>
            {myNewComment && <h3>{myNewComment.by.username} <span>{myNewComment.txt}</span> </h3>}
            <form onSubmit={onSubmitForm}>
                <div className="img-container">
                    <Img imgUrl={loggeginUserImgUrl} className="none" />
                </div>

                <input onChange={handleChange} id="comment" type="text" value={comment.txt} name="txt" placeholder="Add a comment..." />
                {/* if input have value add button post */}
                {comment.txt && <button className="clr-blue bold post">Post</button>}
                {!comment.txt && <span className="post"></span>}
            </form>
        </section>
    )
}
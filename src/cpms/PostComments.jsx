import { useState } from 'react'
import { NavLink, Link } from "react-router-dom";

import { postService } from '../services/post.service'
import { Img } from './Img'

export function PostComments({ loggeginUserImgUrl, onToggleCommentModal, comments, myNewComment, onAddCommentToPost, by, byId, likedBy, txt }) {
    const [comment, setComment] = useState(postService.getEmptyComment())

    function handleChange(ev) {
        let { value, name } = ev.target
        setComment(prevComment => ({ ...prevComment, [name]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        console.log('onSubmitForm')
        onAddCommentToPost(comment)
        setComment(postService.getEmptyComment())
    }
    return (
        <section className="post-comments">
            <h3>{likedBy.length} likes</h3>
            {/* <a>{by} <span>{txt}</span></a> */}
            <Link to={'/profile/' + byId + '/posts'} >
                {by}
                <span>{txt}</span>
            </Link>
            <button onClick={onToggleCommentModal} className="color-grey">View all {comments.length} comments</button>
            {myNewComment && <h3>{myNewComment.by.username} <span>{myNewComment.txt}</span> </h3>}
            <form onSubmit={onSubmitForm}>
                <div className="img-container">
                    <Img imgUrl={loggeginUserImgUrl} className="none" />
                </div>

                <input onChange={handleChange} id="comment" type="text" value={comment.txt} name="txt" placeholder="Add a comment..." />
                {/* if input have value add button post */}
                {comment.txt && <button className="blue bold post">Post</button>}
                {!comment.txt && <span className="post"></span>}
            </form>
        </section>
    )
}
import { useState } from 'react'
import { NavLink, Link } from "react-router-dom";

import { postService } from '../services/post.service'
import { Img } from './Img'
import { utilService } from '../services/util.service'
import { useForm } from '../customHooks/useForm'
import smile from '../assets/icons/face-smile-regular.svg'
import heart from '../assets/icons/heart-regular.svg'
import circle from '../assets/icons/circle-solid.svg'



export function PostComments({createdAt, loggeginUserImgUrl, onToggleCommentModal, comments, myNewComment, onAddCommentToPost, by, byId, likedBy, txt }) {
    const [comment, setComment, handleChange] = useForm(postService.getEmptyComment())

    function onSubmitForm(ev) {
        ev.preventDefault()
        onAddCommentToPost(comment)
        setComment(postService.getEmptyComment())
    }

    function getClass(txt) {
        if (!txt) return
        const res = utilService.isHebrew(txt)
        if (res) return 'rtl'
        else ''
    }

    function getRelativeDate() {
        return utilService.timeDifferenceLong(Date.now(), createdAt)
    }

    function isMobile() {
        return (window.innerWidth > 700) ? false : true
    }

    return (
        <section className="post-comments">
            <h3>{likedBy.length} likes</h3>
            {/* <a>{by} <span>{txt}</span></a> */}
            <Link className="" to={'/profile/' + byId + '/posts'} >
                {by}
                <span className={getClass(txt)}>{txt}</span>
            </Link>

            <h4> 
                {isMobile() && <span>{getRelativeDate()} <img src={circle}/></span>  }
                See translation
            </h4>
            
            <button onClick={onToggleCommentModal} className="clr-grey">View all {comments.length} comments</button>
            {myNewComment && <h3 className="new-comment">
                {myNewComment.by.username} <span className={getClass(myNewComment.txt)}>{myNewComment.txt}</span>
                <span className="icon"> <img src={heart} /></span>
            </h3>}
            <form onSubmit={onSubmitForm}>
                <div className="img-container">
                    <Img imgUrl={loggeginUserImgUrl} className="none" />
                </div>

                <input className={getClass(comment.txt)} onChange={handleChange} id="comment" type="text" value={comment.txt} name="txt" placeholder="Add a comment..." />
                {/* if input have value add button post */}
                {comment.txt && <button className="clr-blue bold post">Post</button>}
                {!comment.txt && <span className="post"></span>}
                {!isMobile() &&<span className="icon"><img src={smile} /></span>}
            </form>
        </section>
    )
}
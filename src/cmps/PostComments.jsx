import { useState, useEffect,useRef } from 'react'
import { NavLink, Link } from "react-router-dom";

import { postService } from '../services/post.service'
import { Img } from './Img'
import { Heart } from './Heart'
import { utilService } from '../services/util.service'
import { useForm } from '../customHooks/useForm'
import smile from '../assets/icons/face-smile-regular.svg'
import heart from '../assets/icons/heart-regular.svg'
import circle from '../assets/icons/circle-solid.svg'
import { useToggle } from '../customHooks/useToggle'

import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

export function PostComments({ openEmojiModal,onToggleEmojiModal,onUpdateLikeComment, createdAt, loggedinUser, onToggleCommentModal, comments, myNewComment, onAddCommentToPost, by, byId, likedBy, txt }) {
    const [comment, setComment, handleChange] = useForm(postService.getEmptyComment())

    const inputTxt = useRef()

    function onSubmitForm(ev) {
        ev.preventDefault()
        console.log('comment:', comment)
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

    function onUpdateLike(isLike) {
        console.log('myNewComment:', myNewComment)
        onUpdateLikeComment(isLike, myNewComment)
    }

    function onAddEmojiToComment(ev) {
        console.log('ev.native:', ev.native)
        const newTxt = comment.txt + ev.native
        setComment(prevComment => ({ ...prevComment, txt: newTxt }))
        onToggleEmojiModal(false)
        inputTxt.current.focus()
    }

    return (
        <section className="post-comments">
            <h3>{likedBy.length} likes</h3>
            <Link className="" to={'/profile/' + byId + '/posts'} >
                {by}
                <span className={getClass(txt)}>{txt}</span>
            </Link>

            <h4>
                {utilService.isMobile() && <span>{getRelativeDate()} <img src={circle} /></span>}
                See translation
            </h4>

            <button onClick={onToggleCommentModal} className="clr-grey">View all {comments.length} comments</button>
            {myNewComment && <h3 className="new-comment">
                {myNewComment.by.username} <span className={getClass(myNewComment.txt)}>{myNewComment.txt}</span>
                <span className="icon">
                    <Heart onUpdateLike={onUpdateLike} loggedinUser={loggedinUser} likedBy={myNewComment.likedBy} />
                </span>
            </h3>}
            <form onSubmit={onSubmitForm}>
                <div className="img-container">
                    <Img imgUrl={loggedinUser.imgUrl} className="none" />
                </div>

                <input ref={inputTxt} className={getClass(comment.txt)} onChange={handleChange} id="comment" type="text" value={comment.txt} name="txt" placeholder="Add a comment..." />
                {/* if input have value add button post */}
                {comment.txt && <button className="clr-blue bold post">Post</button>}
                {!comment.txt && <span className="post"></span>}
                {!utilService.isMobile() && <span onClick={onToggleEmojiModal} className="icon"><img src={smile} /></span>}
                {openEmojiModal &&<div className="picker">
                    <Picker data={data} previewPosition="none" onEmojiSelect={onAddEmojiToComment} />
                    </div>}
            </form>
        </section>
    )
}
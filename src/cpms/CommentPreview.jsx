import {useState} from 'react'

import trash from '../assets/icons/trash-solid.svg'
import {Img} from './Img'
import { utilService } from '../services/util.service'
import {Heart} from './Heart'

export function CommentPreview ({onUpdateLikeComment,comment,onToggleRemoveCommentModal ,loggedinUser,onRemoveCommentFromPost}){
    const [isLiked, setIsLiked] = useState()

    function isLoggdinUserComment(){
        return comment.by.username === loggedinUser.username
    }

    function onUpdateLike(isLike){
        onUpdateLikeComment(isLike,comment)
    }

    function getRelativeDate() {
        return utilService.timeDifference(Date.now(), comment.createdAt)
    }

    function getClass() {
        if(!comment) return
        const res = utilService.isHebrew(comment.txt)
        if (res) return 'rtl'
        else ''
    }
    
    function onRemoveComment(){
        onRemoveCommentFromPost(comment._id)
    }

    return (
        <section className="comment-preview">
            <div className="side-left-container">
            <div className="img-container">
            <Img imgUrl={comment.by.imgUrl} className="gradient"/>
            </div>
            </div>
            <div className="content-container">
                <h3>{comment.by.fullname} <span>{getRelativeDate()}</span></h3>
                <p className={getClass()}>{comment.txt}</p>
                <div className="controls-container">
                <button>Reply</button>
                 <button   onClick={onRemoveComment}>
                <img className={'trash ' +(isLoggdinUserComment()?'allow':'')} src={trash} />
                 </button>
                </div>
             </div>
             <div className="heart-container">
                <Heart onUpdateLike={onUpdateLike} loggedinUser={loggedinUser} likedBy={comment.likedBy}/>
             </div>

        </section>
    )
}
import {useState} from 'react'
import 'animate.css';

import heart from '../assets/icons/heart-regular.svg'
import ellipsis from '../assets/icons/ellipsis-solid.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {Img} from './Img'
import { utilService } from '../services/util.service'
import { RemoveCommentModal } from "../cpms/RemoveCommentModal";

export function CommentPreview ({comment,onToggleRemoveCommentModal ,loggedinUser}){
    // console.log('comment:', comment)
    const [isLiked, setIsLiked] = useState()
    const [openRemoveCommentModal, setOpenRemoveCommentModal] = useState(false)

    function onToggleRemoveCommentModal() {
        setOpenRemoveCommentModal(prev => !prev)
    }
    function isLoggdinUserComment(){
        return comment.by.username === loggedinUser.username
    }

    function onLikeComment() {
        // onUpdateLikePost(!isLiked)
    }

    function getRelativeDate() {
        return utilService.timeDifference(Date.now(), comment.createdAt)
    }

    function getClass() {
        // if (!description) return ''
        const res = utilService.isHebrew(comment.txt.charAt(1))
        if (res) return 'rtl'
        else ''
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
                 <button onClick={onToggleRemoveCommentModal}>
                <img className="ellipsis" src={ellipsis} />
                 </button>
                </div>
             </div>
             <div className="heart-container">
             <a onClick={onLikeComment} className={isLiked ? 'red-heart' : ''}>
                        <img src={heart} />
                        {/* <FontAwesomeIcon className={isLiked ? 'animate__heartBeat' : ''} icon={faHeart} /> */}
            </a>
             </div>
             {openRemoveCommentModal && <RemoveCommentModal isLoggdinUserComment={isLoggdinUserComment()} onToggleRemoveCommentModal={onToggleRemoveCommentModal}/>}

        </section>
    )
}
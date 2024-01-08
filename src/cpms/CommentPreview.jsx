import {useState} from 'react'
import 'animate.css';

import heart from '../assets/icons/heart-regular.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {Img} from './Img'
import { utilService } from '../services/util.service'

export function CommentPreview ({comment}){
    console.log('comment:', comment)
    const [isLiked, setIsLiked] = useState()

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
            {/* <img src={comment.by.imgUrl} alt="" /> */}
            <Img imgUrl={comment.by.imgUrl} className="gradient"/>
            </div>
            </div>
            <div className="content-container">
                <h3>{comment.by.fullname} <span>{getRelativeDate()}</span></h3>
                <p className={getClass()}>{comment.txt}</p>
                <button>Reply</button>
             </div>
             <div className="heart-container">
             <a onClick={onLikeComment} className={isLiked ? 'red-heart' : ''}>
                        <img src={heart} />
                        {/* <FontAwesomeIcon className={isLiked ? 'animate__heartBeat' : ''} icon={faHeart} /> */}
            </a>
             </div>

        </section>
    )
}
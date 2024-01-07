import { useState, useEffect } from 'react'
import 'animate.css';

import heart from '../assets/icons/heart-regular.svg'
import msg from '../assets/icons/comment-regular.svg'
import arrow from '../assets/icons/arrow-up-right.svg'
import bookmark from '../assets/icons/bookmark-regular.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export function PostControls({ onUpdateLikePost, loggedinUser, by, likedBy, txt }) {
    // console.log('likedBy:', likedBy)
    const [isLiked, setIsLiked] = useState()

    useEffect(() => {
        // console.log('hi')
        isLoggedinUserLikePost()

    }, [likedBy])

    function isLoggedinUserLikePost() {
        // console.log('isLoggedinUserLikePost')
        if (!loggedinUser) return false
        const res = likedBy.some(user => user._id === loggedinUser._id)
        // if (res) return true
        if (res) setIsLiked(true)
        else setIsLiked(false)
    }

    function onLikePost() {
        // setIsLiked(prev => !prev)
        onUpdateLikePost(!isLiked)
    }
    return (
        <section className="post-controls">
            <div className="icons-container">
                <div>
                    <a onClick={onLikePost} className={isLiked ? 'red-heart' : ''}>
                        <img src={heart} />
                        <FontAwesomeIcon className={isLiked ? 'animate__heartBeat' : ''} icon={faHeart} />
                    </a>
                    <a>
                        <img src={msg} />
                    </a>
                    <a>
                        <img src={arrow} />
                    </a>
                </div>
                <a>
                    <img className="last" src={bookmark} />
                </a>
            </div>
            <h3>{likedBy.length} likes</h3>
            <h3>{by} <span>{txt}</span></h3>
        </section>
    )
}


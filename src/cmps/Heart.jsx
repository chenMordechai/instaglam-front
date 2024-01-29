import { useState, useEffect } from 'react'
import 'animate.css';

import heart from '../assets/icons/heart-regular.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export function Heart({ onUpdateLike, loggedinUser, likedBy }) {
    const [isLiked, setIsLiked] = useState()

    useEffect(() => {
        isLoggedinUserLikePost()

    }, [likedBy])

    function isLoggedinUserLikePost() {
        if (!loggedinUser) return false
        const res = likedBy.some(user => user._id === loggedinUser._id)
        if (res) setIsLiked(true)
        else setIsLiked(false)
    }

    function onLikePost() {
        onUpdateLike(!isLiked)
    }
    return (
        <a onClick={onLikePost} className={(isLiked ? 'red-heart' : '') + ' heart'}>
            <img className="empty-heart" src={heart} />
            <FontAwesomeIcon className={isLiked ? 'animate__heartBeat' : ''} icon={faHeart} />

        </a>
    )
}
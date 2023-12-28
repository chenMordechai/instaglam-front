import 'animate.css';

import heart from '../assets/icons/heart-regular.svg'
import msg from '../assets/icons/comment-regular.svg'
import arrow from '../assets/icons/arrow-up-right.svg'
import bookmark from '../assets/icons/bookmark-regular.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export function PostControls({ by, likesNumber, txt }) {
    const [isLiked, setIsLiked] = useState()
    return (
        <section className="post-controls">
            <div className="icons-container">
                <div>
                    <a onClick={() => setIsLiked(prev => !prev)} className={isLiked ? 'red-heart' : ''}>
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
            <h3>{likesNumber} likes</h3>
            <h3>{by} <span>{txt}</span></h3>
        </section>
    )
}


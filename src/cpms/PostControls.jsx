
import heart from '../assets/icons/heart-regular.svg'
import msg from '../assets/icons/comment-regular.svg'
import arrow from '../assets/icons/arrow-up-right.svg'
import bookmark from '../assets/icons/bookmark-regular.svg'


export function PostControls({name,likesNumber , description }) {
    return (
        <section className="post-controls">
            <div className="icons-container">
                <div>
                    <a>
                     <img src={heart} />
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
            <h3>{name} <span>{description}</span></h3>
        </section>
    )
}


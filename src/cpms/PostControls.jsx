
import heart from '../assets/icons/heart-regular.svg'
import msg from '../assets/icons/comment-regular.svg'
import arrow from '../assets/icons/arrow-up-right.svg'
import bookmark from '../assets/icons/bookmark-regular.svg'


export function PostControls({name,likesNumber , description }) {
    return (
        <section className="post-controls">
            <div className="btns-container">
                <div>
                    <button>
                     <img src={heart} />
                    </button>
                    <button>
                    <img src={msg} />
                    </button>
                    <button>
                    <img src={arrow} />
                    </button>
                </div>
                <button>
                    <img className="last" src={bookmark} />
                </button>
            </div>
            <h3>{likesNumber} likes</h3>
            <h3>{name} <span>{description}</span></h3>
        </section>
    )
}


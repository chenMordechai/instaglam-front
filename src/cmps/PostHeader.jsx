import { NavLink, Link } from "react-router-dom";

import ellipsis from '../assets/icons/ellipsis-solid.svg'
import circle from '../assets/icons/circle-solid.svg'
import { Img } from './Img'
import { utilService } from '../services/util.service'


export function PostHeader({ byId, by, byImgUrl, createdAt, onToggleOptionsModal }) {
    function getRelativeDate() {
        return utilService.timeDifference(Date.now(), createdAt)
    }

    return (
        <section className="post-header">
            <div className="user-info-container">
                <div className="img-container">
                    <Img imgUrl={byImgUrl} className="gradient" />
                </div>
                <div className="text-container">
                    <Link to={'/profile/' + byId + '/posts'} >
                        {by}
                    </Link>
                    <img src={circle} />
                    <span>{getRelativeDate()}</span>
                </div>
            </div>
            <button onClick={onToggleOptionsModal} className="ellipsis">
                <img src={ellipsis} />
            </button>
        </section>
    )
}


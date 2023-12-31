import ellipsis from '../assets/icons/ellipsis-solid.svg'
import { Img } from './Img'
import circle from '../assets/icons/circle-solid.svg'
import { utilService } from '../services/util.service'


export function PostHeader({ by, byImgUrl, createdAt }) {

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
                    <h3>{by}</h3>
                    <img src={circle} />
                    <span>{getRelativeDate()}</span>
                </div>
            </div>
            <button>
                <img src={ellipsis} />
            </button>
        </section>
    )
}
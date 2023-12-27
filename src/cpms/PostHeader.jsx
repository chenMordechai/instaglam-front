import ellipsis from '../assets/icons/ellipsis-solid.svg'
import { Img } from './Img'
import circle from '../assets/icons/circle-solid.svg'


export function PostHeader({ name, title, img, date }) {
    return (
        <section className="post-header">
            <div className="user-info-container">
                <div className="img-container">
                    <Img />
                </div>
                <div className="text-container">
                    {/* <div className="name-comtainer"> */}
                        <h3>{name}</h3>
                        <img src={circle} />
                        <span>{date}</span>
                    {/* </div> */}
                    {/* <span className='more-info'>{title}</span> */}
                </div>
            </div>
            <button>
                <img src={ellipsis} />
            </button>
        </section>
    )
}
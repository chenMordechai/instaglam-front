import ellipsis from '../assets/icons/ellipsis-solid.svg'
import { Img } from './Img'

export function PostHeader({ name, title, img, date }) {
    return (
        <section className="post-header">
            {/* <div className="gradient">
                <img src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg" />
            </div> */}
            <div className="img-container">
                <Img />
            </div>
            <h3>{name} <span>{date}</span></h3>
            <span>{title}</span>
            <button>
                <img src={ellipsis} />
            </button>
        </section>
    )
}
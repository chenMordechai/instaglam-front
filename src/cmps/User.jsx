import { Link } from "react-router-dom";

import { Img } from "./Img"

export function User({ item, isDragging }) {
    return (
        <section className="user">
            <div className="img-container">
                <Img imgUrl={item.imgUrl} className="gradient" />
            </div>
            <Link to={`/profile/${item._id}/posts`}>
                <span>{item.username}</span>
                {/* {item.username} */}
            </Link>
        </section>
    )
}
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Img } from "./Img"

export function User({ item, isDragging }) {
    function getRandomClass() {
        const location = useLocation();
        if (location.pathname.includes('/message')) return 'none'
        else return 'gradient'
    }
    return (
        <section className="user">
            <div className="img-container">
                <Img imgUrl={item.imgUrl} className={getRandomClass()} />
            </div>
            <Link to={`/profile/${item._id}/posts`}>
                <span>{item.username}</span>
            </Link>
        </section>
    )
}
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Img } from "./Img"

export function User({ item, isDragging, setUserToChat }) {
    function getRandomClass() {
        const location = useLocation();
        if (location.pathname.includes('/message')) return 'none'
        else return 'gradient'
    }

    function onUserClicked() {
        if (setUserToChat) setUserToChat(item)

    }

    return (
        <section className="user" onClick={onUserClicked}>
            <div className="img-container">
                <Img imgUrl={item.imgUrl} className={getRandomClass()} />
            </div>
            <Link to={`/profile/${item._id}/posts`}>
                <span>{item.username}</span>
            </Link>
        </section>
    )
}
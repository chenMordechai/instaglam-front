import { Link, useNavigate, useLocation  } from "react-router-dom";

import { Img } from "./Img"
export function UserPreview({ goToChat, userId, imgUrl, username, spanContent, btnContent, func }) {
    const navigate = useNavigate()

    function getRandomClass() {
        const location = useLocation();
        if(location.pathname.includes('/message')) return 'none'
        return (Math.random() > 0.5) ? 'gradient' : 'none'
    }

    function onUserClicked() {
        if (goToChat) goToChat(userId)
        else navigate(`/profile/${userId}/posts`)
    }
    return (
        <div className="user-preview">
            <div className="img-container">
                <Img imgUrl={imgUrl} className={getRandomClass()} />
            </div>
            <div className="name-container">
                <h3 onClick={onUserClicked}>{username}</h3>
                <span>{spanContent}</span>
            </div>
            <button className={(btnContent === 'Follow') ? 'clr-blue' : 'clr-grey'} onClick={() => func(userId)}>
                {btnContent}
            </button>
        </div>
    )
}
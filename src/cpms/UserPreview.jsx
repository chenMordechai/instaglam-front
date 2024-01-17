
import { Img } from "./Img"
export function UserPreview({ userId, imgUrl, username, spanContent, btnContent, func }) {

    return (
        <div className="user-preview">
            <div className="img-container">
                <Img imgUrl={imgUrl} />
            </div>
            <div className="name-container">
                <h3>{username}</h3>
                <span>{spanContent}</span>
            </div>
            <button className={(btnContent === 'Follow') ? 'clr-blue' :'clr-grey' } onClick={() => func(userId)}>
                {btnContent}
            </button>
        </div>
    )
}

import { Img } from "./Img"
export function UserPreview({ imgUrl, username, spanContent, btnContent }) {
    return (
        <div className="user-preview">
            <div className="img-container">
                <Img imgUrl={imgUrl} />
            </div>
            <div className="name-container">
                <h3>{username}</h3>
                <span>{spanContent}</span>
            </div>
            <button className="blue">{btnContent}</button>
        </div>
    )
}
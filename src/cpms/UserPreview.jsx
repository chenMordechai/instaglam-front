
import { Img } from "./Img"
export function UserPreview({ userId, imgUrl, username, spanContent, btnContent, func }) {

    function getRandomClass(){
        return (Math.random() > 0.5)?'gradient':'none'
      }
    return (
        <div className="user-preview">
            <div className="img-container">
                <Img imgUrl={imgUrl} className={getRandomClass() } />
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
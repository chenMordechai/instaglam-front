import { Link } from "react-router-dom";
import line from '../assets/icons/line.png'
import gear from '../assets/icons/gear.png'
import chart from '../assets/icons/chart-line-solid.svg'
import time from '../assets/icons/time.png'
import qrcode from '../assets/icons/qrcode-solid.svg'
import bookmark from '../assets/icons/bookmark-regular.png'
import bars from '../assets/icons/bars-solid.svg'
import star from '../assets/icons/star-regular.svg'
import arrow from '../assets/icons/arrow-right-from-bracket-solid.svg'

export function PreferenceModal({ loggedinUserId, onTogglePreferencesModal, onLogout }) {
    return (
        <section className="modal">
            <div className="modal-header no-border">
                <img onClick={onTogglePreferencesModal} className="line" src={line} />
            </div>
            <button className="option-container">
                <img src={gear} />
                Settings and privacy
            </button>
            <button className="option-container">
                <img src={chart} />
                Your activity
            </button>
            <button className="option-container">
                <img src={time} />
                Archive
            </button>
            <button className="option-container">
                <img src={qrcode} />
                QR code
            </button>
            <button className="option-container">
                <img src={bookmark} />
                Saved
            </button>
            <button className="option-container">
                <img src={bars} />
                Close Friends
            </button>
            <button className="option-container">
                <img src={star} />
                Favorites
            </button>
            <button className="option-container" onClick={onLogout} >
                <img src={arrow} />
                Log Out
            </button>
        </section>
    )
}
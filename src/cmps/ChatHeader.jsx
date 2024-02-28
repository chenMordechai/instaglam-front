
// video-camera.png
// phone.png
// i.png

import video from '../assets/icons/video-camera.png'
import phone from '../assets/icons/phone.png'
import i from '../assets/icons/i.png'
import arrow from '../assets/icons/arrow-left-long-solid.svg'

import { Img } from './Img'
import { utilService } from '../services/util.service.js'

export function ChatHeader({ imgUrl, fullname, setUserToChat }) {

    return (
        <section className="chat-header">
            {utilService.isMobile() && <img src={arrow} onClick={() => setUserToChat(null)} />}

            <div className="img-container">
                <Img imgUrl={imgUrl} />
            </div>
            <h2>{fullname}</h2>
            <div className="icons">
                <img src={phone} />
                <img src={video} />
                {!utilService.isMobile() && <img src={i} />}
            </div>
        </section>
    )
}
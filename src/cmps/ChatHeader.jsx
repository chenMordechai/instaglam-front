
// video-camera.png
// phone.png
// i.png

import {Img} from './Img'
import video from '../assets/icons/video-camera.png'
import phone from '../assets/icons/phone.png'
import i from '../assets/icons/i.png'


export function ChatHeader ({imgUrl , fullname}){

    return (
        <section className="chat-header">
            <div className="img-container">
                <Img  imgUrl={imgUrl}/>
            </div>
                <h2>{fullname}</h2>
                <div className="icons">
                    <img src={phone} />
                    <img src={video} />
                    <img src={i} />
                </div>
        </section>
    )
}
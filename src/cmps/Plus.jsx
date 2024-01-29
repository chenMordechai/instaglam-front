import { Img } from './Img'
import plus from '../assets/icons/plus.jpg'
import plus2 from '../assets/icons/plus2.png'


export function Plus() {
    return (
        <li className="plus">
            <div className="img-container">
                <Img imgUrl={plus2} className="grey" />
            </div>
            <span>New</span>
        </li>
    )
}
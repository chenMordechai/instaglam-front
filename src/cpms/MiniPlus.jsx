import { Img } from './Img'
import plus from '../assets/icons/plus.jpg'


export function MiniPlus(){
    return(
     <li className="mini-plus">
     <div className="img-container">
      <Img imgUrl={plus} className="none"/>
     </div>
     </li>
    ) 
 }
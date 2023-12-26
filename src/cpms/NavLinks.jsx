import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faCompass,faClapperboard , faFilm , faLocationArrow,faHeart , faSquarePlus ,faBars} from '@fortawesome/free-solid-svg-icons'
import instagram from '../assets/icons/instagram.svg'
import compass from '../assets/icons/compass-regular.svg'
import house from '../assets/icons/house-solid.svg'
import plus from '../assets/icons/square-plus-regular.svg'



export function NavLinks() {
    return (
        <section className="nav-links">
            <img src={instagram} />

            <img src={house} />

            <FontAwesomeIcon icon={faMagnifyingGlass} />
            
            <img src={compass} />
             
            <FontAwesomeIcon icon={faFilm} />
            
            <FontAwesomeIcon icon={faLocationArrow} /> {/*download!!!! */}
          
            <FontAwesomeIcon icon={faHeart} />

            <img src={plus} />

           <button>img</button>
           
            <FontAwesomeIcon icon={faBars} />
        </section>
    )
}
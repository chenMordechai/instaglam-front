import { Story } from "./Story";
import arrowRight from '../assets/icons/caret-right-solid.svg'
import arrowLeft from '../assets/icons/caret-left-solid.svg'


export function Stories() {
    const stories = [{name:'mosheddddddd'},{name:'david'},{name:'Puki.mkfe'},{name:'shuki.g.w3ef'},{name:'momo.lalal'},{name:'nono'},{name:'lolo'},{name:'dfdf'},{name:'mosheddddddd'},{name:'david'}]
    console.log('stories:', stories)
    return (
        <section className="stories">
            <div className="wrapper">
                <button  className="arrow">
            <img src={arrowLeft} />

                </button>
            <ul className="carousel">
            {stories.map(story => <li className="card" key={story.name}>
                <Story story={story}/>
            </li> 
            )}
            </ul>
            <button  className="arrow">
            <img  src={arrowRight} />

            </button  >
            </div>
        </section>
    )
}
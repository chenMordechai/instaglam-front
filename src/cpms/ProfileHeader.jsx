import user from '../assets/icons/user-plus-solid.svg'
import arrow from '../assets/icons/angle-down-solid.svg'
import gear from '../assets/icons/gear-solid.svg'
import chevron from '../assets/icons/chevron-left-solid.svg'


export function ProfileHeader ({username}){
    return(
        // my profile
        // <section className="profile-header">
        // <img src={gear} />
        //     <h2>{username} <span>  <img src={arrow} /></span></h2>
        // <img src={user} />
        // </section>

        // not my profile
        <section className="profile-header">
        <img src={chevron} />
            <h2>{username} </h2>
            <span></span>
        </section>
    )
       
    
}
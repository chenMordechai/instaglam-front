import user from '../assets/icons/user-plus-solid.svg'
import arrow from '../assets/icons/angle-down-solid.svg'
import gear from '../assets/icons/gear-solid.svg'
import chevron from '../assets/icons/chevron-left-solid.svg'
import {Link } from 'react-router-dom'


export function ProfileHeader ({loggedinUser,username}){

    function isLoggedinUserProfile(){
        return loggedinUser.username === username
    }

    return(
        <div>

    {  isLoggedinUserProfile() &&  <section className="profile-header">
        <img src={gear} />
            <h2>{username} <span>  <img src={arrow} /></span></h2>
        <img src={user} />
        </section>}

       { !isLoggedinUserProfile() &&<section className="profile-header">
        <Link to="/home">
        <img src={chevron} />
        </Link>
     
            <h2>{username} </h2>
            <span></span>
        </section>}
        </div>
    )
       
    
}
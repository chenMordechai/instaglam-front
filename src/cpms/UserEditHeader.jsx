import { Link } from 'react-router-dom'
import chevron from '../assets/icons/chevron-left-solid.svg'

export function UserEditHeader({userId}){
    return (
        <section className="header">
              <Link to={`/profile/${userId}`}>
                    <img src={chevron} />
                </Link>
            <h2>Edit Profile</h2>
            <span></span>
        </section>
    )
}
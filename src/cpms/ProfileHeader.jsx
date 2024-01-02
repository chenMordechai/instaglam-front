import { useState } from "react"

import user from '../assets/icons/user-plus-solid.svg'
import arrow from '../assets/icons/angle-down-solid.svg'
import gear from '../assets/icons/gear-solid.svg'
import chevron from '../assets/icons/chevron-left-solid.svg'
import { Link } from 'react-router-dom'

export function ProfileHeader({ isLoggedinUserProfile, username , onTogglePreferencesModal }) {
    return (
        <div>
            {isLoggedinUserProfile && <section className="profile-header">
                <button onClick={onTogglePreferencesModal}><img src={gear} /></button>
                <h2>{username}
                    <button>
                        <img src={arrow} />
                    </button>
                </h2>
                <button> <img src={user} /></button>
            </section>}

            {!isLoggedinUserProfile && <section className="profile-header">
                <Link to="/home">
                    <img src={chevron} />
                </Link>
                <h2>{username} </h2>
                <span></span>
            </section>}
        </div>
    )


}
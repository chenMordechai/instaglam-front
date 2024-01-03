import { useState, Fragment } from "react"

import gear from '../assets/icons/gear-solid.svg'
import plus from '../assets/icons/square-plus-regular.svg'
import arrow from '../assets/icons/angle-down-solid.svg'
import bars from '../assets/icons/bars-solid.svg'
import chevron from '../assets/icons/chevron-left-solid.svg'
import { Link } from 'react-router-dom'

export function ProfileHeader({ isLoggedinUserProfile, username, onTogglePreferencesModal }) {
    return (
        <Fragment>
            {isLoggedinUserProfile && <section className="header">
                <h2>{username}
                    <button >
                        <img src={arrow} />
                    </button>
                </h2>
                <div>
                    <Link to="/post/edit">
                        <img src={plus} />
                    </Link>
                    <button onClick={onTogglePreferencesModal}>
                        <img src={gear} />
                    </button>
                </div>
            </section>}

            {!isLoggedinUserProfile && <section className="header">
                <Link to="/home">
                    <img src={chevron} />
                </Link>
                <h2>{username} </h2>
                <span></span>
            </section>}
        </Fragment>
    )


}
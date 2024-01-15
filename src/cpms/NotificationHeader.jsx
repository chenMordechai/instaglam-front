import { Link } from "react-router-dom";

import chevron from '../assets/icons/chevron-left-solid.svg'

export function NotificationHeader() {
    return (
        <section className="header">
                <Link to="/home">
                    <img src={chevron} />
                </Link>
                <h2>Notificatios</h2>
                <span></span>
        </section>
    )
}
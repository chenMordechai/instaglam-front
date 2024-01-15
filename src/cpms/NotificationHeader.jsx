import { Link,useNavigate } from "react-router-dom";

import chevron from '../assets/icons/chevron-left-solid.svg'

export function NotificationHeader() {

    const navigate = useNavigate()
    return (
        <section className="header">
                <button onClick={()=>navigate(-1)}>
                    <img src={chevron} />
                </button>
                <h2>Notificatios</h2>
                <span></span>
        </section>
    )
}
import { Link,useNavigate } from "react-router-dom";

import chevron from '../assets/icons/chevron-left-solid.svg'

export function SimpleHeader({h2Content}) {

    const navigate = useNavigate()
    return (
        <section className="header">
                <button onClick={()=>navigate(-1)}>
                    <img src={chevron} />
                </button>
                <h2>{h2Content}</h2>
                <span></span>
        </section>
    )
}
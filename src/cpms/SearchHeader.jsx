import { Link,useNavigate } from "react-router-dom";

import chevron from '../assets/icons/chevron-left-solid.svg'

export function SearchHeader() {

    const navigate = useNavigate()
    return (
        <section className="header">
                <button onClick={()=>navigate(-1)}>
                    <img src={chevron} />
                </button>
                <h2>Search</h2>
                <span></span>
        </section>
    )
}
import { Link, useNavigate } from "react-router-dom";

import chevron from '../assets/icons/chevron-left-solid.svg'

export function SimpleHeader({ h2Content, onToggleSearchModal }) {

    const navigate = useNavigate()

    function onChevronClicked() {
        if (onToggleSearchModal) onToggleSearchModal()
        else navigate(-1)
    }
    return (
        <section className="header">
            <button onClick={onChevronClicked}>
                <img src={chevron} />
            </button>
            <h2>{h2Content}</h2>
            <span></span>
        </section>
    )
}
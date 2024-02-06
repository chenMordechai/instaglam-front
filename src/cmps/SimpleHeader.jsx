import { Link, useNavigate } from "react-router-dom";

import chevron from '../assets/icons/chevron-left-solid.svg'

export function SimpleHeader({ h2Content, onToggleModal, spanContent }) {

    const navigate = useNavigate()

    function onChevronClicked() {
        if (onToggleModal) onToggleModal()
        else navigate(-1)
    }
    return (
        <section className="header">
            <button onClick={onChevronClicked}>
                <img src={chevron} />
            </button>
            <h2>{h2Content}</h2>
            <span>{spanContent}</span>
        </section>
    )
}
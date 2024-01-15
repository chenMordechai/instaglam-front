import { Link } from "react-router-dom";

export function PreferenceModal ({loggedinUserId,onTogglePreferencesModal,onLogout}){
    return (
        <section className="modal">
            <button className="doesnt-work">Apps and Websites </button>
            <button className="doesnt-work">QR Code</button>
            <Link to={'/notification/'+loggedinUserId} >
            Notifications
            </Link>
            <button className="doesnt-work">Settings and privacy</button>
            <button className="doesnt-work">Meta Verified</button>
            <button className="doesnt-work">Supervision</button>
            <button onClick={onLogout} >Log Out</button>
            <button onClick={onTogglePreferencesModal} >Cancel</button>
        </section>
    )
}
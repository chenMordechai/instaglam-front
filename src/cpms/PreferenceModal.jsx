

export function PreferenceModal ({onTogglePreferencesModal,onLogout}){
    return (
        <section className="modal">
            <button>Apps and Websites </button>
            <button>QR Code</button>
            <button>Notifications</button>
            <button>Settings and privacy</button>
            <button>Meta Verified</button>
            <button>Supervision</button>
            <button onClick={onLogout} >Log Out</button>
            <button onClick={onTogglePreferencesModal} >Cancel</button>
        </section>
    )
}
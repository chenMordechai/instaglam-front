

export function Modal ({onToggleModal,onLogout}){
    return (
        <section className="modal">
            <button>Apps and Websites</button>
            <button>QR Code</button>
            <button>Notifications</button>
            <button>Settings and privacy</button>
            <button>Meta Verified</button>
            <button>Supervision</button>
            <button onClick={onLogout} >Log Out</button>
            <button onClick={onToggleModal} >Cancel</button>
        </section>
    )
}
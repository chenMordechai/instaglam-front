
import arrow from '../assets/icons/arrow-left-long-solid.svg'

export function SearchMessageModal() {
    return (
        <section className="search-message-modal">
            <section className="search-message-header">
                <button>
                    <img src={arrow} />
                </button>
                <form >
                    <input type="text" placeholder="Search" />
                </form>
            </section>

            <section>

            </section>
        </section>
    )
}
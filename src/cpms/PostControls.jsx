
import heart from '../assets/icons/heart-regular.svg'


export function PostControls({ }) {
    return (
        <section className="post">
            <div className="btn-container">
                <div>
                    <button>
                        <img src={heart} />
                    </button>
                    <button></button>
                    <button></button>
                </div>
                <button></button>
            </div>
        </section>
    )
}


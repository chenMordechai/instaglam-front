import { Img } from "./Img"

export function User({ user, isDragging }) {
    return (
        <section className="story">
            <div className="img-container">
                <Img imgUrl={user.imgUrl} isGradient={true} />
            </div>
            <span>{user.username}</span>
        </section>
    )
}
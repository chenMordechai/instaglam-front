import { Img } from "./Img"

export function User({ item, isDragging }) {
    return (
        <section className="user">
            <div className="img-container">
                <Img imgUrl={item.imgUrl} className="gradient" />
            </div>
            <span>{item.username}</span>
        </section>
    )
}
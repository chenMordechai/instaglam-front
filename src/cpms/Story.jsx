

export function Story({ story, isDragging }) {
    return (
        <section className="story">
            <div className="gradient">
                <img draggable="false" src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg" />
            </div>
            <span>{story.name}</span>
        </section>
    )
}
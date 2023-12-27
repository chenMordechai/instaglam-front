

export function Story({story}) {
    return (
        <section className="story">
            <div className="gradient">
            <img src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg"/>
                </div>
          <span>{story.name}</span>
        </section>
    )
}
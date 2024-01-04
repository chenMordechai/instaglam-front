

export function PostMedia({ media  , filter}) {
   
    return (
        <section className="post-media" style={filter}>
            <img src={media} />
        </section>
    )
}
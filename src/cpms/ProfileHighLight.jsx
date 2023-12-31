import { Img } from './Img'
// import { Carousel } from './Img'
// import { HighlightPreview } from './HighlightPreview'


export function ProfileHighlight({highlights}) {
    console.log('highlights:', highlights)
    return (
        <section className="profile-highlight">
            <ul>
            {highlights.map(highlight => <li key={highlight._id}>
                <div className="img-container">
                <Img imgUrl={highlight.imgUrl}/>
                </div>
                <span>{highlight.name}</span>
            </li>)}
            </ul>
            {/* <Carousel items={highlights} Comp={HighlightPreview} /> */}
        </section>
    )
}
import { Plus } from './Plus'
import { Carousel } from './Carousel'
import { HighlightPreview } from './HighlightPreview'


export function ProfileHighlight({highlights}) {
    console.log('highlights:', highlights)
    return (
        <section className="profile-highlight">
            <Carousel items={highlights} Comp1={HighlightPreview} Comp2={Plus}/>
        </section>
    )
}

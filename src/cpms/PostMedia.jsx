
import {Media} from './media'

export function PostMedia({ media}) {
    console.log('media:', media)
   
    return (
        <section className="post-media" style={media.filter}>
            {/* <img src={media} /> */}
            <Media media={media} style={media.filter}/>
        </section>
    )
}
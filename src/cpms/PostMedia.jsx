
import {Media} from './media'

export function PostMedia({ type,url , filter}) {
   
    return (
        <section className="post-media" style={filter}>
            {/* <img src={media} /> */}
            <Media type={type} url={url} style={filter}/>
        </section>
    )
}
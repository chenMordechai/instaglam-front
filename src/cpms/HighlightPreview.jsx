import { Img } from './Img'

export function HighlightPreview ({item}){

    return (
        <section className="highlight-preview">
        <div className="img-container">
            <Img imgUrl={item.imgUrl} className="grey"/>
        </div>
        <span>{item.name}</span>
        </section>
    )
}
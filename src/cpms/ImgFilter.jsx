
import { Media } from "../cpms/Media.jsx";

export function ImgFilter ({item,media,onSetImgFilter}){
       const mystyle = {
        filter:item.prop,
      };
    return (
        <section className="img-filter">
            {/* <img onClick={()=>onSetImgFilter(mystyle)} src={imgUrl} style={mystyle} /> */}
            <Media onClick={()=>onSetImgFilter(mystyle)} media={media} style={mystyle}/>
            <h3>{item.name}</h3>
        </section>
    )
}
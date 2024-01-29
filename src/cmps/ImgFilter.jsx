
import { Media } from "../cmps/Media.jsx";

export function ImgFilter ({item,type,url,onSetImgFilter}){
       const mystyle = {
        filter:item.prop
      }
    return (
        <section className="img-filter"  onClick={()=>onSetImgFilter(mystyle)}>
            {/* <img onClick={()=>onSetImgFilter(mystyle)} src={imgUrl} style={mystyle} /> */}
            <Media type={type} url={url} style={mystyle}/>
            <h3>{item.name}</h3>
        </section>
    )
}

import { Media } from "../cpms/Media.jsx";

export function ImgFilter ({item,type,url,onSetImgFilter}){
    console.log('item:', item)
       const mystyle = {
        filter:item.prop
      }
    return (
        <section className="img-filter">
            {/* <img onClick={()=>onSetImgFilter(mystyle)} src={imgUrl} style={mystyle} /> */}
            <Media onClick={()=>onSetImgFilter(mystyle)} type={type} url={url} style={mystyle}/>
            <h3>{item.name}</h3>
        </section>
    )
}


export function ImgFilter ({item,imgUrl,onSetImgFilter}){
       const mystyle = {
        filter:item.prop,
      };
    return (
        <section className="img-filter">
            <img onClick={()=>onSetImgFilter(mystyle)} src={imgUrl} style={mystyle} />
            <h3>{item.name}</h3>
        </section>
    )
}
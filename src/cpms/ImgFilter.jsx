

export function ImgFilter ({item,imgUrl,onSetImgFilter}){
       const mystyle = {
        filter:item.prop,
      };
    return (
        <section className="img-filter">
            <h3>{item.name}</h3>
            <img onClick={()=>onSetImgFilter(mystyle)} src={imgUrl} style={mystyle} />
            <button></button>
        </section>
    )
}
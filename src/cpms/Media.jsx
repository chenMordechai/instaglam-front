

export function Media ({type ,url,style}){
    // console.log('media:', media)

    function getMediaType(){
        if(!type) return ''
        if(type.includes('image'))return 'img'
        else return 'video'
    }
    return (
        <section className="media">
             {getMediaType() === 'img'  &&  <img src={url} style={style} />}
                {getMediaType() === 'video' && 
                 <video  style={style} controls >
                <source src={url} type="video/mp4"/>
                </video>}
        </section>
    )
}


export function Media ({media,style}){
    // console.log('media:', media)

    function getMediaType(){
        if(!media) return ''
        if(media.type.includes('image'))return 'img'
        else return 'video'
    }
    return (
        <section className="media">
             {getMediaType() === 'img'  &&  <img src={media.url} style={style} />}
                {getMediaType() === 'video' && 
                 <video  style={style} controls >
                <source src={media.url} type="video/mp4"/>
                </video>}
        </section>
    )
}
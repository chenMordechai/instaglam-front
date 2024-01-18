import image from '../assets/icons/image-regular.svg'
import { Carousel } from "../cpms/Carousel.jsx";
import { ImgFilter } from "../cpms/ImgFilter.jsx";
import { Media } from "../cpms/Media.jsx";
import loader from '../assets/icons/loader.gif'


export function PostEditImg({ isLoading, media, style, onChangeImg, filters, onSetImgFilter }) {
    console.log('media:', media)
    function getMediaType(){
        if(!media) return ''
        if(media.type.includes('image'))return 'img'
        else return 'video'
    }
    return (
        <section className="post-edit-img">
            <div className="placeholder-container">
                {!media && !isLoading && <img className="placeholder" src={image} />}
                {isLoading && <img className="loader" src={loader} />}
                {!isLoading && <Media media={media} style={style} />}
            </div>

            <button className="clr-blue bold">
                <label htmlFor="imgFile">
                    Upload Photo / Video
                    <input type="file" id="imgFile" onChange={onChangeImg} />
                </label>
            </button>

           <div className="img-filter-container">
                <Carousel items={filters} Comp1={ImgFilter} media={media} onSetImgFilter={onSetImgFilter} />
            </div>
        </section>
    )
}
import image from '../assets/icons/image-regular.svg'
import { Carousel } from "../cpms/Carousel.jsx";
import { ImgFilter } from "../cpms/ImgFilter.jsx";
import { Media } from "../cpms/Media.jsx";
import loader from '../assets/icons/loader.gif'


export function PostEditImg({ isLoading, type ,url, style, onChangeImg, filters, onSetImgFilter }) {
    return (
        <section className="post-edit-img">
            <div className="placeholder-container">
                {!url && !isLoading && <img className="placeholder" src={image} />}
                {isLoading && <img className="loader" src={loader} />}
                {!isLoading && url && <Media type={type} url={url} style={style} />}
            </div>

            <button className="clr-blue bold">
                <label htmlFor="imgFile">
                    Upload Photo / Video
                    <input type="file" id="imgFile" onChange={onChangeImg} />
                </label>
            </button>

           <div className="img-filter-container">
             { url &&  <Carousel items={filters} Comp1={ImgFilter} type={type} url={url}  onSetImgFilter={onSetImgFilter} />}
            </div>
        </section>
    )
}
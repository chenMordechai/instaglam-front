import image from '../assets/icons/image-regular.svg'
import { Carousel } from "../cpms/Carousel.jsx";
import { ImgFilter } from "../cpms/ImgFilter.jsx";


export function PostEditImg ({imgUrl ,style , onChangeImg , filters , onSetImgFilter}){
    return (
        <section>

        <div className="img-container">
        {imgUrl &&  <img src={imgUrl} style={style}  />}
        {!imgUrl &&  <img className="placeholder" src={image}  />}
      </div>

      <button className="blue bold">
          <label htmlFor="imgFile">
          Upload Photo
          <input type="file" id="imgFile" onChange={onChangeImg} />
          </label>
      </button>
    
     { imgUrl && <div className="img-filter-container">
     <Carousel items={filters} Comp1={ImgFilter} imgUrl={imgUrl || image } onSetImgFilter={onSetImgFilter} />
         </div>}
        </section>
    )
}
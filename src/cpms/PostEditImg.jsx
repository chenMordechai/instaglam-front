import image from '../assets/icons/image-regular.svg'
import { Carousel } from "../cpms/Carousel.jsx";
import { ImgFilter } from "../cpms/ImgFilter.jsx";
import loader from '../assets/icons/loader.gif'


export function PostEditImg ({isLoading,imgUrl ,style , onChangeImg , filters , onSetImgFilter}){
    return (
        <section className="post-edit-img">
        <div className="img-container">
        {!imgUrl && !isLoading &&  <img className="placeholder" src={image}  />}
        { isLoading &&  <img className="loader"  src={loader } />}
        {imgUrl && !isLoading  &&<img src={imgUrl} style={style}  />}
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
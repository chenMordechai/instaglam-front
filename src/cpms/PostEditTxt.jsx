import location from '../assets/icons/location-dot-solid.svg'
import user from '../assets/icons/user-solid.svg'
import music from '../assets/icons/music-solid.svg'
import facebook from '../assets/icons/facebook.svg'
import eye from '../assets/icons/eye-solid.svg'
import gear from '../assets/icons/gear-solid.svg'
import chevron from '../assets/icons/chevron-right-solid.svg'



export function PostEditTxt ({isEdit,imgUrl, style,postToEdit, setPostToEdit,handleChange,onSubmitForm}){

  
    return (
        <section className="post-edit-txt">
            <div className="img-container">
             <img src={imgUrl} style={style}  />
          </div>
          <form onSubmit={onSubmitForm} >
          <label htmlFor="txt">
             Write a caption
            <textarea onChange={handleChange} value={postToEdit.txt} name="txt" type="text" id="txt" />
        </label>
        <button type="button">
            <div>
            <img src={location} />
            Add location
            </div>
            <img src={chevron} />
        </button>
        <button type="button">
        <div>
            <img src={user} />
            Tag people
            </div>
            <img src={chevron} />
        </button>
        <button type="button">
        <div>
            <img src={eye} />
            Audience
            </div>
            <img src={chevron} />
        </button>
        <button type="button">
        <div>
            <img src={music} />
            Add music
            </div>
            <img src={chevron} />
        </button>
        <button type="button">
        <div>
            <img src={facebook} />
            Share to Facebook
            </div>
            {/* <img src={chevron} /> */}
            <div className="switch">
            <input type="checkbox" className="switch-input" id="switch-1" />
            <label className="switch-label"  htmlFor="switch-1">

            </label>
            </div>
        </button>
        <button type="button">
        <div>
            <img src={gear} />
            Advanced settings
            </div>
            <img src={chevron} />
        </button>


        <button className="share" type="submit">
           {isEdit?'Save':'Share'} 
            </button>
          </form>
        </section>
    )
}
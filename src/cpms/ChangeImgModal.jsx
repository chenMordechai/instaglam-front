

export function ChangeImgModal ({onChangeImg, onRemoveImg, onToggleChangeImgModal, imgUrl }){
    return (
        <section className="modal">
            <button className="regular">
                <img  src={imgUrl } />
                <h2>Synced profile photo</h2>
                <span>Instaglam, Faceboob</span>
            </button>
            <button className="blue bold">
                <label htmlFor="imgFile">
                Upload Photo
                <input type="file" id="imgFile" onChange={onChangeImg} />
                </label>
                </button>
            <button>Manage sync settings</button>
            <button className="red bold" onClick={onRemoveImg}>Remove Current Photo</button>
            <button onClick={onToggleChangeImgModal} >Cancel</button>
        </section>
    )
}
import loader from '../assets/icons/loader.gif'

export function ChangeImgModal({ isLoading, onChangeImg, onRemoveImg, onToggleChangeImgModal, imgUrl }) {

    return (
        <section className="modal">
            <button className="regular">
                {isLoading && <img className="loader" src={loader} />}
                {!isLoading && <img src={imgUrl} />}
                <h2>Synced profile photo</h2>
                <span>Instaglam, Faceboob</span>
            </button>
            <button className="clr-blue bold">
                <label htmlFor="imgFile">
                    Upload Photo
                    <input type="file" id="imgFile" onChange={onChangeImg} />
                </label>
            </button>
            <button>
                Manage sync settings
            </button>
            <button className="clr-red bold" onClick={onRemoveImg}>
                Remove Current Photo
            </button>
            <button onClick={onToggleChangeImgModal} >
                Cancel
            </button>
        </section>
    )
}
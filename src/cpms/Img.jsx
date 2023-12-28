

export function Img({ imgUrl, isGradient }) {
    const img = imgUrl ? imgUrl : 'https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg'
    return (
        <div className={`${isGradient ? 'gradient' : 'regular'}`}>
            <img draggable="false" src={img} />
        </div>
    )
}
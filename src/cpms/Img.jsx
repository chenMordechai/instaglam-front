

export function Img({ imgUrl, className }) {
    const img = imgUrl ? imgUrl : 'https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg'
    return (
        // className : gradient / grey / none
        <div className={className}>
            <img draggable="false" src={img} />
        </div>
    )
}
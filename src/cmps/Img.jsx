

export function Img({ imgUrl, className }) {
    return (
        // className : gradient / grey / none
        <div className={className + ' circle-img'}>
            <img draggable="false" src={imgUrl} />
        </div>
    )
}
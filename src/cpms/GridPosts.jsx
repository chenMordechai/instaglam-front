import { useRef, useEffect } from 'react'

export function GridPosts({ posts }) {
    const square = useRef()
    const grid = useRef()

    useEffect(() => {
        updateWidth()
        addResizeListener()

        return () => {
            removeResizeListener()
        }
    }, [])

    function addResizeListener() {
        window.addEventListener('resize', updateWidth)
    }
    function removeResizeListener() {
        window.removeEventListener('resize', updateWidth)
    }

    function updateWidth() {
       
        const width = square?.current?.offsetWidth
        grid.current.style.gridAutoRows = width + 'px'
    }

    function getStyle(postImgUrl, postImgFilter) {

        return {
            backgroundImage: `url(${postImgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: postImgFilter
        }
    }

    return (
        <ul ref={grid} className="grid-container">
            {posts.map(post => <li
                ref={square} className="square"
                key={post._id}
                style={getStyle(post.imgUrl, post.imgFilter?.filter)}>

            </li>)}
            </ul>
    )
}
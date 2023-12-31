// import { User } from "./User";
import arrowRight from '../assets/icons/caret-right-solid.svg'
import arrowLeft from '../assets/icons/caret-left-solid.svg'
import { useEffect, useRef, useState } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";


export function Carousel({ items , Comp1 , Comp2}) {
    const [isDragging, setIsDragging] = useState()
    const [startX, setStartX] = useState()
    const [startScrollLeft, setStartScrollLeft] = useState()
    let carousel = useRef()

    useEffect(() => {
        document.addEventListener('mouseup', dragStop)
    }, [])

    function dragStart(ev) {
        setIsDragging(true)
        setStartX(ev.pageX || ev.touches[0].clientX)
        setStartScrollLeft(carousel.current.scrollLeft)
    }
    function dragging(ev) {
        if (!isDragging) return
        let x = ev.pageX || ev.touches[0].clientX
        carousel.current.scrollLeft = startScrollLeft - (x - startX)
    }

    function dragStop() {
        setIsDragging(false)
    }

    function moveCarousel(direction) {
        const firstCardWidth = carousel.current.offsetWidth
        carousel.current.scrollLeft += (direction === 'left') ? -firstCardWidth : firstCardWidth
    }

    if(!items) return ''
    return (
            <div className="wrapper">
                <button onClick={() => moveCarousel('left')} className="arrow">
                    <img src={arrowLeft} />
                </button>
                <ul ref={carousel} className={`carousel ${isDragging ? 'dragging' : ''}`}
                    onMouseDown={dragStart} onMouseMove={dragging}
                    onTouchStart={dragStart} onTouchMove={dragging}>
                    {items.map(item => <li className="card" key={item._id}>
                        <Comp1 item={item} isDragging={isDragging} />
                    </li>
                    )}
                 {Comp2 && <Comp2/>}
                </ul>
                <button onClick={() => moveCarousel('right')} className="arrow">
                    <img src={arrowRight} />
                </button  >
            </div>
    )
}
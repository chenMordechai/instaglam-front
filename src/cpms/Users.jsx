import { User } from "./User";
import arrowRight from '../assets/icons/caret-right-solid.svg'
import arrowLeft from '../assets/icons/caret-left-solid.svg'
import { useEffect, useRef, useState } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";


export function Users({ users }) {
    // const stories = [{ name: 'mosheddddddd' }, { name: 'david' }, { name: 'Puki.mkfe' }, { name: 'shuki.g.w3ef' }, { name: 'momo.lalal' }, { name: 'nono' }, { name: 'lolo' }, { name: 'dfdf' }, { name: 'mosheddddd' }, { name: 'daviddd' }]
    // console.log('stories:', stories)
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

    return (
        <section className="stories">
            <div className="wrapper">
                <button onClick={() => moveCarousel('left')} className="arrow">
                    <img src={arrowLeft} />
                </button>
                <ul ref={carousel} className={`carousel ${isDragging ? 'dragging' : ''}`}
                    onMouseDown={dragStart} onMouseMove={dragging}
                    onTouchStart={dragStart} onTouchMove={dragging}>
                    {users.map(user => <li className="card" key={user._id}>
                        <User user={user} isDragging={isDragging} />
                    </li>
                    )}
                </ul>
                <button onClick={() => moveCarousel('right')} className="arrow">
                    <img src={arrowRight} />
                </button  >
            </div>
        </section>
    )
}
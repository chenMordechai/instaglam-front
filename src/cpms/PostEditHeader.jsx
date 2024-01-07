import { useNavigate } from "react-router-dom"

import xmark from '../assets/icons/xmark-solid.svg'
import check from '../assets/icons/check-solid.svg'
import arrow from '../assets/icons/arrow-left-long-solid.svg'
import { Fragment } from 'react'

export function PostEditHeader({ pageNum, isEdit , onChangePageNum}) {
   console.log('isEdit:', isEdit)
    const navigate = useNavigate()
    return (
        <section className="post-edit-header">
            <section>
            { pageNum === 1 &&<button onClick={()=>navigate(-1)}>
                  <img src={xmark} />
                </button>}
                { pageNum === 2 &&  
                <button onClick={()=>onChangePageNum(-1)}>
                  <img src={arrow} />
                </button>}
                {!isEdit &&
                    <h2>New post</h2>}

                {isEdit &&
                    <h2>Edit info</h2>}
            </section>

            { pageNum === 1 &&
                <button onClick={()=>onChangePageNum(1)} className='blue bold'>
                    Next
                    </button>}
           
        </section>
    )
}

import xmark from '../assets/icons/xmark-solid.svg'
import check from '../assets/icons/check-solid.svg'
import { Fragment } from 'react'

export function PostEditHeader({ isEdit }) {
    return (
        <section className="header">
            <section>
                <button>
                    <img src={xmark} />
                </button>
                {!isEdit &&
                    <h2>New post</h2>}

                {isEdit &&
                    <h2>Edit info</h2>}
            </section>

            {!isEdit &&
                <button className='blue bold'>Next</button>}

            {isEdit &&
                <button>
                    <img src={check} />
                </button>}



        </section>
    )
}
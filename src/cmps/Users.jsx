import {memo} from 'react'

import { User } from "./User";
import { Carousel } from "./Carousel";

export const Users = memo(({ users })=> {
    console.log('Users render')
    return (
        <section className="users">
            <Carousel items={users} Comp1={User} />
        </section>
    )
})
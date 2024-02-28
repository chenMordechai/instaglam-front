import { memo } from 'react'

import { User } from "./User";
import { Carousel } from "./Carousel";

export const Users = memo(({ users, setUserToChat }) => {
    console.log('users:', users)
    return (
        <section className="users">
            <Carousel items={users} Comp1={User} setUserToChat={setUserToChat} />
        </section>
    )
})
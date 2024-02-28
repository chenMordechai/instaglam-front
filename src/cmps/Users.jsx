import { memo } from 'react'

import { User } from "./User";
import { Carousel } from "./Carousel";

export const Users = memo(({ users, setUserToChat }) => {
    return (
        <section className="users">
            <Carousel items={users} Comp1={User} setUserToChat={setUserToChat} />
        </section>
    )
})
import { useEffect } from "react";
import { useSelector } from 'react-redux'


import { Users } from "../cpms/Users";
import { Posts } from "../cpms/Posts";
import { loadPosts } from '../store/actions/post.actions.js'
import { loadUsers } from '../store/actions/user.actions.js'


export function Home() {
    const { posts } = useSelector(storeState => storeState.postModule)
    const { users } = useSelector(storeState => storeState.userModule)
    // console.log('users:', users)
    useEffect(() => {
        try {
            loadPosts()
            loadUsers()
        } catch (err) {
            console.log('err:', err)
        }

    }, [])
    return (
        <section className="home">
            <Users users={users} />
            <Posts posts={posts} />

        </section>
    )
}
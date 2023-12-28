import { useEffect } from "react";
import { useSelector } from 'react-redux'


import { Stories } from "../cpms/Stories";
import { Posts } from "../cpms/Posts";
import { loadPosts } from '../store/actions/post.actions.js'


export function Home() {
    const { posts } = useSelector(storeState => storeState.postModule)
    useEffect(() => {
        try {
            loadPosts()
        } catch (err) {
            console.log('err:', err)
        }

    }, [])
    return (
        <section className="home">
            <Stories />
            <Posts posts={posts} />

        </section>
    )
}
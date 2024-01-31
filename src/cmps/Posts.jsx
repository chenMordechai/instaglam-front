import {memo} from 'react'
import { Post } from "./Post";

export const Posts = memo(({ onOpenScreen, onCloseScreen, posts, loggedinUser })=> {
    return (
        <section className="posts">
            <ul className="posts-container">
                {posts.map(post => <li key={post._id}>
                    <Post onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} post={post} loggedinUser={loggedinUser} />
                </li>)}
            </ul>
        </section>
    )
})
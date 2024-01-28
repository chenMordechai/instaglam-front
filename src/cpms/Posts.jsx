import { Post } from "./Post";


export function Posts({ onOpenScreen, onCloseScreen, posts, loggedinUser }) {
    // console.log('posts:', posts)
    return (
        <section className="posts">
            <ul className="posts-container">
                {posts.map(post => <li key={post._id}>
                    <Post onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} post={post} loggedinUser={loggedinUser} />
                </li>)}
            </ul>
        </section>
    )
}
import { Post } from "./Post";


export function Posts({ isScreenOpen, onOpenScreen, onCloseScreen, posts, loggedinUser }) {
    // console.log('posts:', posts)
    return (
        <section className="posts">
            <ul className="posts-container">
                {posts.map(post => <li key={post._id}>
                    <Post isScreenOpen={isScreenOpen} onOpenScreen={onOpenScreen} onCloseScreen={onCloseScreen} post={post} loggedinUser={loggedinUser} />
                </li>)}
            </ul>
        </section>
    )
}
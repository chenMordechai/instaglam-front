import { Post } from "./Post";


export function Posts({ posts }) {
    return (
        <section className="posts">
            <ul className="posts-container">
                {posts.map(post => <li key={post._id}>
                    <Post post={post} />
                </li>)}
            </ul>
        </section>
    )
}
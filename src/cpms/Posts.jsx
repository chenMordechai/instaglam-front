import { Post } from "./Post";


export function Posts() {
    const posts = [{ _id: '2398', name: 'moshe', title: 'lala naa', profileImg: '', media: '', likesNumber: 260, comments: ['lala', 'jaja', 'baba'], date: 'now' }]
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
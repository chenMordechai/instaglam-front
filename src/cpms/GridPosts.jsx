

export function GridPosts ({posts}){
    return (
        <ul className="grid-container">
            {posts.map(post=> <li key={post._id}>
            <img src={post.imgUrl} />
        </li>)}</ul>
    )
}
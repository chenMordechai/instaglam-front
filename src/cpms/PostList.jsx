import { Outlet, Link } from 'react-router-dom'

export function PostList({userId}) {
    return (
        <section className="post-list">
            <nav>
                <Link to={`/profile/${userId}/posts`}>Posts</Link>
                <Link to={`/profile/${userId}/tagged`}>Tagged</Link>
            </nav>
            <section>
                <Outlet />
            </section>
        </section>
    )
}
import { PostComments } from "./PostComments"
import { PostHeader } from "./PostHeader"
import { PostMedia } from "./PostMedia"
import { PostControls } from "./PostControls"

export function Post({ post }) {
    return (
        <section className="post">
            <PostHeader by={post.by.username} byImgUrl={post.by.imgUrl} createdAt={post.createdAt} />
            <PostMedia media={post.imgUrl} />
            <PostControls by={post.by.username} likesNumber={post.likedBy.length} txt={post.txt} />
            <PostComments comments={post.comments} />
        </section>
    )
}
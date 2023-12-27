import { PostComments } from "./PostComments"
import { PostHeader } from "./PostHeader"
import { PostMedia } from "./PostMedia"


export function Post({ post }) {
    console.log('post:', post)
    const { name, title, profileImg, date } = post
    return (
        <section className="post">
            <PostHeader name={name} title={title} img={profileImg} date={date} />
            <PostMedia />
            <PostComments />
        </section>
    )
}
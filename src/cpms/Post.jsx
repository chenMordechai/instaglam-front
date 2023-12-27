import { PostComments } from "./PostComments"
import { PostHeader } from "./PostHeader"
import { PostMedia } from "./PostMedia"
import { PostControls } from "./PostControls"



export function Post({ post }) {
    console.log('post:', post)
    const { name, title, profileImg, date, media, likesNumber, description } = post
    return (
        <section className="post">
            <PostHeader name={name} title={title} img={profileImg} date={date} />
            <PostMedia media={media} />
            <PostControls name={name} likesNumber={likesNumber} description={description}/>
            <PostComments />
        </section>
    )
}
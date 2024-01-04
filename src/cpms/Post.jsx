import { useState} from "react";

import { PostComments } from "./PostComments"
import { PostHeader } from "./PostHeader"
import { PostMedia } from "./PostMedia"
import { PostControls } from "./PostControls"
import { PostOptionsModal } from "../cpms/PostOptionsModal";

export function Post({ post,loggedinUser }) {
    console.log('post:', post)
    const [openOptionsModal, setOpenOptionsModal] = useState(false)

    function onToggleOptionsModal() {
        setOpenOptionsModal(prev => !prev)
    }

    function isLoggedinUserPost() {
        if (!loggedinUser) return false
        return loggedinUser.username === post.by.username
    }
    // console.log('post:', post)
    return (
        <section className="post">
            {openOptionsModal && <PostOptionsModal postId={post._id} onToggleOptionsModal={onToggleOptionsModal} isLoggedinUserPost={isLoggedinUserPost()} />}

            <PostHeader onToggleOptionsModal={onToggleOptionsModal} byId={post.by._id} by={post.by.username} byImgUrl={post.by.imgUrl} createdAt={post.createdAt} />
            <PostMedia media={post.imgUrl} filter={post.imgFilter} />
            <PostControls by={post.by.username} likesNumber={post.likedBy.length} txt={post.txt} />
            <PostComments comments={post.comments} />
        </section>
    )
}
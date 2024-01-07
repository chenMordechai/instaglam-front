import { useState } from "react";

import { PostComments } from "./PostComments"
import { PostHeader } from "./PostHeader"
import { PostMedia } from "./PostMedia"
import { PostControls } from "./PostControls"
import { PostOptionsModal } from "../cpms/PostOptionsModal";
import { removeLikeByPostOptimistic, saveLikeByPostOptimistic } from '../store/actions/post.actions.js'

export function Post({ post, loggedinUser }) {
    console.log('post:', post)
    const [openOptionsModal, setOpenOptionsModal] = useState(false)

    function onToggleOptionsModal() {
        setOpenOptionsModal(prev => !prev)
    }

    function isLoggedinUserPost() {
        if (!loggedinUser) return false
        return loggedinUser.username === post.by.username
    }

    function onUpdateLikePost(isLike) {
        console.log('isLike:', isLike)
        if (isLike) saveLikeByPostOptimistic(post._id, loggedinUser)
        else removeLikeByPostOptimistic(post._id, loggedinUser)
        // console.log('post:', post)
        // console.log('loggedinUser:',loggedinUser)
        // const postToSave = { ...post }
        // if (isLike) postToSave.likedBy = [...postToSave.likedBy, loggedinUser]
        // else postToSave.likedBy = postToSave.likedBy.filter(u => u._id !== loggedinUser._id)
        // savePost({...post, })
        // console.log('postToSave:', postToSave)

    }
    return (
        <section className="post">
            {openOptionsModal && <PostOptionsModal postId={post._id} onToggleOptionsModal={onToggleOptionsModal} isLoggedinUserPost={isLoggedinUserPost()} />}

            <PostHeader onToggleOptionsModal={onToggleOptionsModal} byId={post.by._id} by={post.by.username} byImgUrl={post.by.imgUrl} createdAt={post.createdAt} />
            <PostMedia media={post.imgUrl} filter={post.imgFilter} />
            <PostControls onUpdateLikePost={onUpdateLikePost} likedBy={post.likedBy} loggedinUser={loggedinUser} by={post.by.username} txt={post.txt} />
            <PostComments comments={post.comments} />
        </section>
    )
}
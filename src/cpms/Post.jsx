import { useState } from "react";

import { PostComments } from "./PostComments"
import { PostHeader } from "./PostHeader"
import { PostMedia } from "./PostMedia"
import { PostControls } from "./PostControls"
import { PostOptionsModal } from "../cpms/PostOptionsModal";
import { PostCommentModal } from "../cpms/PostCommentModal";
import { removeLikeByPostOptimistic, addLikeByPostOptimistic, removePost , addComment ,removeComment,addLikeByCommentOptimistic,removeLikeByCommentOptimistic} from '../store/actions/post.actions.js'

export function Post({ post, loggedinUser }) {
    const [openOptionsModal, setOpenOptionsModal] = useState(false)
    const [openCommentModal, setOpenCommentModal] = useState(false)
    const [newComment, setNewComment] = useState(null)

    function onToggleOptionsModal() {
        setOpenOptionsModal(prev => !prev)
    }
    function onToggleCommentModal() {
        setOpenCommentModal(prev => !prev)
    }
  
    function isLoggedinUserPost() {
        if (!loggedinUser) return false
        return loggedinUser.username === post.by.username
    }

    function onUpdateLikePost(isLike) {
        if (isLike) addLikeByPostOptimistic(post._id, loggedinUser)
        else removeLikeByPostOptimistic(post._id, loggedinUser)
    }

    function onUpdateLikeComment(isLike , commentId) {
        if (isLike) addLikeByCommentOptimistic(post._id,commentId, loggedinUser)
        else removeLikeByCommentOptimistic(post._id,commentId, loggedinUser)
    }

    function onRemovePost() {
        removePost(post._id)
    }

    async function onAddCommentToPost(comment){
        const addedComment = await addComment(comment,post._id)
        setNewComment(addedComment)
    }
    
    async function onRemoveCommentFromPost(commentId){
        await removeComment(commentId,post._id)
    }

    return (
        <section className="post">
            {openOptionsModal && <PostOptionsModal onRemovePost={onRemovePost} postId={post._id} onToggleOptionsModal={onToggleOptionsModal} isLoggedinUserPost={isLoggedinUserPost()} />}
            {openCommentModal && <PostCommentModal onUpdateLikeComment={onUpdateLikeComment} comments={post.comments} loggedinUser={loggedinUser} username={post.by.username} onAddCommentToPost={onAddCommentToPost} onToggleCommentModal={onToggleCommentModal} onRemoveCommentFromPost={onRemoveCommentFromPost} />}

            <PostHeader onToggleOptionsModal={onToggleOptionsModal} byId={post.by._id} by={post.by.username} byImgUrl={post.by.imgUrl} createdAt={post.createdAt} />
            <PostMedia media={post.imgUrl} filter={post.imgFilter}  />
            <PostControls onUpdateLikePost={onUpdateLikePost} likedBy={post.likedBy} loggedinUser={loggedinUser} />
            <PostComments onToggleCommentModal={onToggleCommentModal} comments={post.comments} myNewComment={newComment} onAddCommentToPost={onAddCommentToPost}  likedBy={post.likedBy} by={post.by.username} txt={post.txt} />
        </section>
    )
}
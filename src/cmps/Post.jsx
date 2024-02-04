import { useState, useEffect, useContext } from "react";

import { PostComments } from "./PostComments"
import { PostHeader } from "./PostHeader"
import { PostMedia } from "./PostMedia"
import { PostControls } from "./PostControls"
import { PostOptionsModal } from "../cmps/PostOptionsModal";
import { PostCommentModal } from "../cmps/PostCommentModal";
import { removeLikeByPostOptimistic, addLikeByPostOptimistic, removePost, addComment, removeComment, addLikeByCommentOptimistic, removeLikeByCommentOptimistic } from '../store/actions/post.actions.js'
import { removeFollowing } from '../store/actions/user.actions.js'
import { ScreenOpenContext } from "../contexts/ScreenOpenConext.js";
import { useToggle } from '../customHooks/useToggle'
import { useEffectToggleModal } from '../customHooks/useEffectToggleModal'
import { useEffectCloseModal } from '../customHooks/useEffectCloseModal'

export function Post({ post, loggedinUser }) {
    const [openOptionsModal, onToggleOptionsModal] = useToggle(false)
    const [openCommentModal, onToggleCommentModal] = useToggle(false)
    const [newComment, setNewComment] = useState(null)

    const { isScreenOpen, onOpenScreen, onCloseScreen, } = useContext(ScreenOpenContext)

    useEffectToggleModal(onOpenScreen,onCloseScreen,[openOptionsModal,openCommentModal])
  
    useEffectCloseModal(isScreenOpen,[onToggleOptionsModal,onToggleCommentModal])

    function isLoggedinUserPost() {
        return loggedinUser._id === post.by._id
    }

    function onUpdateLikePost(isLike) {
        if (isLike) addLikeByPostOptimistic(post._id, loggedinUser)
        else removeLikeByPostOptimistic(post._id, loggedinUser)
    }

    function onUpdateLikeComment(isLike, comment) {
        if (isLike) addLikeByCommentOptimistic(post._id, comment, loggedinUser)
        else removeLikeByCommentOptimistic(post._id, comment._id, loggedinUser)
    }

    function onRemovePost() {
        removePost(post._id)
    }

    async function onAddCommentToPost(comment) {
        const addedComment = await addComment(comment, post._id)
        setNewComment(addedComment)
    }

    async function onRemoveCommentFromPost(commentId) {
        await removeComment(commentId, post._id)
    }

    return (
        <section className="post">
            {openOptionsModal && <PostOptionsModal userId={post.by._id}  onRemovePost={onRemovePost} postId={post._id} onToggleOptionsModal={onToggleOptionsModal} isLoggedinUserPost={isLoggedinUserPost()} />}
            {openCommentModal && <PostCommentModal onUpdateLikeComment={onUpdateLikeComment} comments={post.comments} loggedinUser={loggedinUser} username={post.by.username} onAddCommentToPost={onAddCommentToPost} onToggleCommentModal={onToggleCommentModal} onRemoveCommentFromPost={onRemoveCommentFromPost} />}

            <PostHeader onToggleOptionsModal={onToggleOptionsModal} byId={post.by._id} by={post.by.username} byImgUrl={post.by.imgUrl} createdAt={post.createdAt} />
            <PostMedia type={post.type} url={post.url} filter={post.imgFilter} />
            <PostControls onUpdateLikePost={onUpdateLikePost} likedBy={post.likedBy} loggedinUser={loggedinUser} />
            <PostComments createdAt={post.createdAt}  loggeginUserImgUrl={loggedinUser.imgUrl} onToggleCommentModal={onToggleCommentModal} comments={post.comments} myNewComment={newComment} onAddCommentToPost={onAddCommentToPost} likedBy={post.likedBy} by={post.by.username} byId={post.by._id} txt={post.txt} />
        </section>
    )
}
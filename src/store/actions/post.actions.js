
import { postService } from "../../services/post.service.js";
import { ADD_POST, REMOVE_POST, SET_POSTS, UPDATE_POST, SET_IS_LOADING, SET_POST, UPDATE_POST_LIKED_BY, REMOVE_POST_LIKED_BY, UPDATE_POST_COMMENT, REMOVE_POST_COMMENT, UPDATE_COMMENT_LIKED_BY, REMOVE_COMMENT_LIKED_BY } from "../reducers/post.reducer.js";
import { store } from "../store.js";

export function getActionAddPost(post) {
    return { type: ADD_POST, post }
}
export function getActionUpdatePost(post) {
    return { type: UPDATE_POST, post }
}
export function getActionRemovePost(postId) {
    return { type: REMOVE_POST, postId }
}
export function getActionLikePostAdd(postId, likedByUser) {
    return { type: UPDATE_POST_LIKED_BY, postId, likedBy: likedByUser }
}
export function getActionLikePostRemove(postId, likeById) {
    return { type: REMOVE_POST_LIKED_BY, postId, likeById }
}
export function getActionCommentAdd(postId, addedComment) {
    return { type: UPDATE_POST_COMMENT, postId, comment: addedComment }
}
export function getActionCommentRemove(postId, commentId) {
    return { type: REMOVE_POST_COMMENT, postId, commentId }
}


export async function loadPosts(filterBy) {
    try {
        const posts = await postService.query(filterBy)
        store.dispatch({ type: SET_POSTS, posts })
    } catch (err) {
        console.log('post action -> Cannot load posts', err)
        throw err
    }
}

export async function loadPost(postId) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const post = await postService.getById(postId)
        store.dispatch({ type: SET_POST, post })
    } catch (err) {
        console.log('post action -> Cannot load post', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removePost(postId) {
    console.log('removePost', postId)
    try {
        await postService.remove(postId)
        store.dispatch(getActionRemovePost(postId))
    } catch (err) {
        console.log('post action -> Cannot remove post', err)
        throw err

    }
}

export async function savePost(post) {
    const type = post._id ? UPDATE_POST : ADD_POST
    try {
        const postToSave = await postService.save(post)
        store.dispatch({ type, post: postToSave })
        return postToSave
    } catch (err) {
        console.log('post action -> Cannot save post', err)
        throw err

    }
}

export async function addLikeByPost(postId) {
    try {
        const likedBy = await postService.addLikePost(postId)
        store.dispatch(getActionLikePostAdd(postId, likedBy))
        return likedBy
    } catch (err) {
        console.log('post action -> Cannot save post', err)
        throw err
    }
}

export async function addLikeByPostOptimistic(postId, likedByUser) {
    try {
        store.dispatch(getActionLikePostAdd(postId, likedByUser))
        const likedBy = await postService.addLikePost(postId)
        return likedBy
    } catch (err) {
        store.dispatch({ type: REMOVE_POST_LIKED_BY, postId, likeById: likedByUser._id })
        console.log('post action -> Cannot save post', err)
        throw err

    }

}

export async function removeLikeByPost(postId, likeById) {
    try {
        const updatedPostId = await postService.removeLikePost(postId, likeById)
        store.dispatch(getActionLikePostRemove(postId, likeById))
        return updatedPostId
    } catch (err) {
        console.log('post action -> Cannot remove like', err)
        throw err
    }
}

export async function removeLikeByPostOptimistic(postId, likedByUser) {
    try {
        store.dispatch(getActionLikePostRemove(postId,likedByUser._id))
        const likedBy = await postService.removeLikePost(postId, likedByUser._id)
        return likedBy
    } catch (err) {
        store.dispatch({ type: UPDATE_POST_LIKED_BY, postId, likedBy: likedByUser })
        console.log('post action -> Cannot save post', err)
        throw err
    }
}

export async function addComment(comment, postId) {
    try {
        const addedComment = await postService.addComment(comment, postId)
        store.dispatch(getActionCommentAdd(postId, addedComment))
        return addedComment
    } catch (err) {
        console.log('post action -> Cannot save post', err)
        throw err

    }
}

export async function removeComment(commentId, postId) {
    try {
        const updatedPostId = await postService.removeComment(commentId, postId)
        store.dispatch(getActionCommentRemove(postId, commentId) )
        return updatedPostId
    } catch (err) {
        console.log('post action -> Cannot remove comment', err)
        throw err

    }
}

export async function addLikeByCommentOptimistic(postId, comment, likedByUser) {
    try {
        store.dispatch({ type: UPDATE_COMMENT_LIKED_BY, postId, commentId: comment._id, likedBy: likedByUser })
        const likedBy = await postService.addLikeComment(postId, comment)
        return likedBy
    } catch (err) {
        store.dispatch({ type: REMOVE_COMMENT_LIKED_BY, postId, commentId: comment._id, likeById: likedByUser._id })
        console.log('post action -> Cannot save like comment', err)
        throw err

    }

}

export async function removeLikeByCommentOptimistic(postId, commentId, likedByUser) {
    try {
        store.dispatch({ type: REMOVE_COMMENT_LIKED_BY, postId, commentId, likeById: likedByUser._id })
        const likedBy = await postService.removeLikeComment(postId, commentId, likedByUser._id)
        return likedBy
    } catch (err) {
        store.dispatch({ type: UPDATE_COMMENT_LIKED_BY, postId, commentId, likedBy: likedByUser })
        console.log('post action -> Cannot remove like comment', err)
        throw err

    }

}

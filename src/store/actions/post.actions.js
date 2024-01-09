
import { postService } from "../../services/post.service.js";
import { ADD_POST, REMOVE_POST, SET_POSTS, UPDATE_POSTS, UPDATE_POST, SET_IS_LOADING, SET_POST, UPDATE_POST_LIKED_BY, REMOVE_POST_LIKED_BY , UPDATE_POST_COMMENT } from "../reducers/post.reducer.js";
import { store } from "../store.js";


export async function loadPosts() {
    // const { filterBy } = store.getState().postModule
    // const { sortBy } = store.getState().postModule
    try {
        const posts = await postService.query()
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
        store.dispatch({ type: REMOVE_POST, postId })
    } catch (err) {
        console.log('post action -> Cannot remove post', err)
        throw err

    }
}

export async function savePost(post) {
    const type = post._id ? UPDATE_POSTS : ADD_POST
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
        store.dispatch({ type: UPDATE_POST_LIKED_BY, postId, likedBy })
        return likedBy
    } catch (err) {
        console.log('post action -> Cannot save post', err)
        throw err
    }
}

export async function addLikeByPostOptimistic(postId, likedByUser) {
    try {
        store.dispatch({ type: UPDATE_POST_LIKED_BY, postId, likedBy: likedByUser })
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
        store.dispatch({ type: REMOVE_POST_LIKED_BY, postId, likeById })
        return updatedPostId
    } catch (err) {
        console.log('post action -> Cannot save post', err)
        throw err

    }
}

export async function removeLikeByPostOptimistic(postId, likedByUser) {
    try {
        store.dispatch({ type: REMOVE_POST_LIKED_BY, postId, likeById: likedByUser._id })
        const likedBy = await postService.removeLikePost(postId , likedByUser._id)
        return likedBy
    } catch (err) {
        store.dispatch({ type: UPDATE_POST_LIKED_BY, postId, likedBy: likedByUser })
        console.log('post action -> Cannot save post', err)
        throw err

    }

}

export async function addComment(comment,postId){
    // console.log('comment:', comment)
    // console.log('txt,postId:', txt,postId)
    try {
        const addedComment = await postService.addComment(comment,postId)
        store.dispatch({ type: UPDATE_POST_COMMENT, postId, comment:addedComment })
        return addedComment
    } catch (err) {
        console.log('post action -> Cannot save post', err)
        throw err

    }
}
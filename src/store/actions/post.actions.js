
import { postService } from "../../services/post.service.js";
import { ADD_POST, REMOVE_POST, SET_POSTS, UPDATE_POST, SET_IS_LOADING, SET_POST } from "../reducers/post.reducer.js";
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
    try {
        await postService.remove(postId)
        store.dispatch({ type: REMOVE_POST, postId })
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
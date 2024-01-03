import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { UPDATE_POST } from "../store/reducers/post.reducer";
import { savePost } from '../store/actions/post.actions.js'
import { utilService } from "../services/util.service"
import { postService } from "../services/post.service"
import { PostEditHeader } from "../cpms/PostEditHeader.jsx";

export function PostEdit() {
    const [postToEdit, setPostToEdit] = useState(postService.getEmptyPost())

    const { postId } = useParams()

    useEffect(() => {
        // if (postId) loadPost()

    }, [postId])

    async function loadPost() {
        try {
            const post = await postService.getById(postId)
            setPostToEdit(post)
        } catch (err) {
            console.log('Had issues in post details', err)
            navigate('/post')
        }
    }

    function handleChange(ev) {
        let { value, name, type } = ev.target
        if (type === 'number') value = +value
        else if (type === 'checkbox') value = ev.target.checked
        setPostToEdit(prevPost => ({ ...prevPost, [name]: value }))
    }

    async function onSubmitForm(ev) {
        ev.preventDefault()
        try {
            const savedPost = await savePost({ ...postToEdit })
            console.log('savedPost:', savedPost)
            // showSuccessMsg('Save Post: ' + savedPost._id)
            // navigate('/post')
        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot Save Post')
        }
    }

    async function uploadImg(ev) {
        const imgUrl = await utilService.uploadImgToCloudinary(ev)
        setPostToEdit(prevPost => ({ ...prevPost, imgUrl: imgUrl }))
    }

    return (
        <section className="post-edit">
            <PostEditHeader isEdit={postId ? true : false} />
            <h1>Post Edit</h1>
            <form onSubmit={onSubmitForm}>
            </form>


        </section>
    )
}
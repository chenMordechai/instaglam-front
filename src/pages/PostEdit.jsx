import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

// import { UPDATE_POST } from "../store/reducers/post.reducer";
import { savePost } from '../store/actions/post.actions.js'
import { utilService } from "../services/util.service"
import { postService } from "../services/post.service"
import { PostEditHeader } from "../cmps/PostEditHeader.jsx";
import { PostEditImg } from "../cmps/PostEditImg.jsx";
import { PostEditTxt } from "../cmps/PostEditTxt.jsx";
import { useForm } from '../customHooks/useForm'


export function PostEdit() {
    const [postToEdit, setPostToEdit, handleChange] = useForm(postService.getEmptyPost())
    const [pageNum, setPageNum] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (postId) loadPost()
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

    async function onSubmitForm(ev) {
        ev.preventDefault()
        try {
            const savedPost = await savePost({ ...postToEdit })
            // showSuccessMsg('Save Post: ' + savedPost._id)
            navigate('/home')
        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot Save Post')
        }
    }

    async function onChangeImg(ev) {
        try {
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            const {type,url } = media
            setPostToEdit(() => ({ ...postToEdit, type, url}))
        } catch (err) {
            console.log('err:', err)
        } finally {
            setIsLoading(false)
        }
    }

    function onSetImgFilter(imgFilter) {
        setPostToEdit(prevPost => ({ ...prevPost, imgFilter }))
    }

    function onChangePageNum(diff) {
        setPageNum(prev => prev + diff)
    }
    return (
        <section className="post-edit">
            <PostEditHeader pageNum={pageNum} isEdit={postId ? true : false} onChangePageNum={onChangePageNum} />
            <div className="post-edit-container">
                {pageNum === 1 && <PostEditImg isLoading={isLoading} type={postToEdit.type} url={postToEdit.url}  style={postToEdit.imgFilter} onChangeImg={onChangeImg} filters={postService.getFilters()} onSetImgFilter={onSetImgFilter} />}
                {pageNum === 2 && <PostEditTxt isEdit={postId ? true : false} type={postToEdit.type} url={postToEdit.url} style={postToEdit.imgFilter} postToEdit={postToEdit} setPostToEdit={setPostToEdit} handleChange={handleChange} onSubmitForm={onSubmitForm} />}

            </div>


        </section>
    )
}
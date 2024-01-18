import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

// import { UPDATE_POST } from "../store/reducers/post.reducer";
import { savePost } from '../store/actions/post.actions.js'
import { utilService } from "../services/util.service"
import { postService } from "../services/post.service"
import { PostEditHeader } from "../cpms/PostEditHeader.jsx";
import { PostEditImg } from "../cpms/PostEditImg.jsx";
import { PostEditTxt } from "../cpms/PostEditTxt.jsx";


export function PostEdit() {
    const [postToEdit, setPostToEdit] = useState(postService.getEmptyPost())
    const [pageNum, setPageNum] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (postId) loadPost()
        // console.log('postToEdit.txt:', postToEdit.txt)

    }, [postId])

    async function loadPost() {
        try {
            const post = await postService.getById(postId)
            console.log('post:', post)
            setPostToEdit(post)
        } catch (err) {
            console.log('Had issues in post details', err)
            navigate('/post')
        }
    }

    function handleChange(ev) {
        let { value, name } = ev.target
        setPostToEdit(prevPost => ({ ...prevPost, [name]: value }))
    }


    async function onSubmitForm(ev) {
        ev.preventDefault()
        try {
            const savedPost = await savePost({ ...postToEdit })
            console.log('savedPost:', savedPost)
            // showSuccessMsg('Save Post: ' + savedPost._id)
            navigate('/home')
        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot Save Post')
        }
    }

    async function onChangeImg(ev) {
        // console.log('ev:', ev)
        try {
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            console.log('media:', media)
            setPostToEdit(() => ({ ...postToEdit, media }))
        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot Save Toy')
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
                {pageNum === 1 && <PostEditImg isLoading={isLoading} media={postToEdit.media} style={postToEdit.imgFilter} onChangeImg={onChangeImg} filters={postService.getFilters()} onSetImgFilter={onSetImgFilter} />}
                {pageNum === 2 && <PostEditTxt isEdit={postId ? true : false} media={postToEdit.media} style={postToEdit.media.imgFilter} postToEdit={postToEdit} setPostToEdit={setPostToEdit} handleChange={handleChange} onSubmitForm={onSubmitForm} />}

            </div>


        </section>
    )
}
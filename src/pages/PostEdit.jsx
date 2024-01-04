import { useEffect, useState ,useRef} from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { UPDATE_POST } from "../store/reducers/post.reducer";
import { savePost } from '../store/actions/post.actions.js'
import { utilService } from "../services/util.service"
import { postService } from "../services/post.service"
import { PostEditHeader } from "../cpms/PostEditHeader.jsx";
import { PostEditImg } from "../cpms/PostEditImg.jsx";
import { PostEditTxt } from "../cpms/PostEditTxt.jsx";


export function PostEdit() {
    const [postToEdit, setPostToEdit] = useState(postService.getEmptyPost())
    const [pageNum, setPageNum] = useState(1)

    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // if (postId) loadPost()
        // console.log('postToEdit.txt:', postToEdit.txt)

    }, [postId,postToEdit])

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
        const imgUrl = await utilService.uploadImgToCloudinary(ev)
        try {
            setPostToEdit(() => ({ ...postToEdit, imgUrl: imgUrl }))
        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot Save Toy')
        }
    }

   function onSetImgFilter(imgFilter){
    setPostToEdit(prevPost => ({ ...prevPost, imgFilter }))
   }
   
   function onChangePageNum(diff){
    setPageNum(prev => prev +diff)
   }
    return (
        <section className="post-edit">
            <PostEditHeader isEdit={postId ? true : false} onChangePageNum={onChangePageNum} />
           <div className="post-edit-container">
            <h2>Post Edit</h2>

         { pageNum === 1 && <PostEditImg imgUrl={postToEdit.imgUrl} style={postToEdit.imgFilter} onChangeImg={onChangeImg} filters={postService.getFilters()} onSetImgFilter={onSetImgFilter}/>}
         { pageNum === 2 && <PostEditTxt imgUrl={postToEdit.imgUrl} style={postToEdit.imgFilter} postToEdit={postToEdit} setPostToEdit={setPostToEdit} handleChange={handleChange} onSubmitForm={onSubmitForm}/>}
            
            </div>


        </section>
    )
}
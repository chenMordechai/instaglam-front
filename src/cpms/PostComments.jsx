import {useState} from 'react'

import {postService} from '../services/post.service'

export function PostComments({comments ,myNewComment, onAddCommentToPost}) {
    const [comment, setComment] = useState(postService.getEmptyComment())
    
    function handleChange(ev) {
        let { value, name } = ev.target
        setComment(prevComment => ({ ...prevComment, [name]: value }))
    }

    function onSubmitForm(ev){
        ev.preventDefault()
        console.log('onSubmitForm')
        onAddCommentToPost(comment)
        setComment(postService.getEmptyComment())
    }
    return (
        <section className="post-comments">
            <h3>View all {comments.length} comments</h3>
           { myNewComment &&<h2>{myNewComment.by.username} <span>{myNewComment.txt}</span> </h2>}
            <form onSubmit={onSubmitForm}>
            <input onChange={handleChange} id="comment" type="text" value={comment.txt} name="txt" placeholder="Add a comment..." />
            {/* if input have value add button post */}
           { comment.txt && <button className="blue bold post">Post</button>}
           </form>
        </section>
    )
}
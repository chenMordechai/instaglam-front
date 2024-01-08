import {useState} from 'react'

import {postService} from '../services/post.service'

export function PostComments({onToggleCommentModal,comments ,myNewComment, onAddCommentToPost, by, likedBy, txt}) {
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
            <h3>{likedBy.length} likes</h3>
            <h3>{by} <span>{txt}</span></h3>
            <button onClick={onToggleCommentModal} className="color-grey">View all {comments.length} comments</button>
           { myNewComment &&<h3>{myNewComment.by.username} <span>{myNewComment.txt}</span> </h3>}
            <form onSubmit={onSubmitForm}>
            <input onChange={handleChange} id="comment" type="text" value={comment.txt} name="txt" placeholder="Add a comment..." />
            {/* if input have value add button post */}
           { comment.txt && <button className="blue bold post">Post</button>}
           </form>
        </section>
    )
}
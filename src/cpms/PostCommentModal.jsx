import {CommentPreview} from './CommentPreview'
import {AddComment} from './AddComment'

export function PostCommentModal ({comments,loggedinUserImg,username,onAddCommentToPost}){
    // console.log('comments:', comments)
    return (
        <section className="modal comment-modal">
            <h3> Comments</h3>
            <ul>
                {comments.map(comment => <li key={comment._id}>
                    <CommentPreview comment={comment}/>
                </li>)}
            </ul>

            <AddComment loggedinUserImg={loggedinUserImg} username={username} onAddCommentToPost={onAddCommentToPost}/>
        </section>
    )
}
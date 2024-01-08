import {CommentPreview} from './CommentPreview'
import {AddComment} from './AddComment'

export function PostCommentModal ({comments}){
    // console.log('comments:', comments)
    return (
        <section className="modal comment-modal">
            <h3> Comments</h3>
            <ul>
                {comments.map(comment => <li key={comment._id}>
                    <CommentPreview comment={comment}/>
                </li>)}
            </ul>

            <AddComment/>
        </section>
    )
}
import {CommentPreview} from './CommentPreview'
import {AddComment} from './AddComment'
import line from '../assets/icons/line.png'

export function PostCommentModal ({onUpdateLikeComment,comments,loggedinUser,username,onAddCommentToPost,onToggleCommentModal,onToggleRemoveCommentModal,onRemoveCommentFromPost}){
    return (
        <section className="modal comment-modal">
            <div className="header">
            <img onClick={onToggleCommentModal} className="line" src={line} />
            <h3> Comments</h3>
            </div>
            <ul >
                {comments.map(comment => <li key={comment._id}>
                    <CommentPreview onUpdateLikeComment={onUpdateLikeComment} comment={comment} loggedinUser={loggedinUser} onRemoveCommentFromPost={onRemoveCommentFromPost} />
                </li>)}
            </ul>

            <AddComment loggedinUserImg={loggedinUser.imgUrl} username={username} onAddCommentToPost={onAddCommentToPost}/>

        </section>
    )
}
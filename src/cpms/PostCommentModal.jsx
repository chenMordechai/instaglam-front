import {CommentPreview} from './CommentPreview'
import {AddComment} from './AddComment'
import line from '../assets/icons/line.png'

export function PostCommentModal ({comments,loggedinUserImg,username,onAddCommentToPost,onToggleCommentModal}){
    // console.log('comments:', comments)
    return (
        <section className="modal comment-modal">
            <div className="header">
            <img onClick={onToggleCommentModal} className="line" src={line} />
            <h3> Comments</h3>
            </div>
            <ul>
                {comments.map(comment => <li key={comment._id}>
                    <CommentPreview comment={comment}/>
                </li>)}
            </ul>

            <AddComment loggedinUserImg={loggedinUserImg} username={username} onAddCommentToPost={onAddCommentToPost}/>
        </section>
    )
}
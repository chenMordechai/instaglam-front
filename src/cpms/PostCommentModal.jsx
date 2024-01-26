import { useState } from 'react'

import { CommentPreview } from './CommentPreview'
import { AddComment } from './AddComment'
import line from '../assets/icons/line.png'

export function PostCommentModal({ onUpdateLikeComment, comments, loggedinUser, username, onAddCommentToPost, onToggleCommentModal, onToggleRemoveCommentModal, onRemoveCommentFromPost }) {

    const [height, setHeight] = useState(70)

    let startingX, startingY, movingX, movingY;

    function touchStart(evt) {
        startingX = evt.touches[0].clientX;
        startingY = evt.touches[0].clientY;
    }
    function touchMove(evt) {
        movingX = evt.touches[0].clientX;
        movingY = evt.touches[0].clientY;
        // const diff = parseInt((movingY - startingY))
        // setHeight(prev => prev - diff)
    }
    function touchEnd() {
        if (startingX + 10 < movingX) {
            console.log('right');
        } else if (startingX - 10 > movingX) {
            console.log('left');
        }

        if (startingY + 10 < movingY) {
            console.log('down');
        } else if (startingY - 10 > movingY) {
            console.log('up');
        }
    }

    return (
        <section className="modal comment-modal" style={{ height: height + '%' }}
            onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd}>
            <div className="header">
                <img onClick={onToggleCommentModal} className="line" src={line} />
                <h3> Comments</h3>
            </div>
            <ul >
                {comments.map(comment => <li key={comment._id}>
                    <CommentPreview onUpdateLikeComment={onUpdateLikeComment} comment={comment} loggedinUser={loggedinUser} onRemoveCommentFromPost={onRemoveCommentFromPost} />
                </li>)}
            </ul>

            <AddComment loggedinUserImg={loggedinUser.imgUrl} username={username} onAddCommentToPost={onAddCommentToPost} />

        </section>
    )
}
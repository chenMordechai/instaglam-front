

export function PostComments({comments}) {
    
    return (
        <section className="post-comments">
            <h3>View all {comments.length} comments</h3>
            <input id="comment" type="text" placeholder="Add a comment..." />
        </section>
    )
}
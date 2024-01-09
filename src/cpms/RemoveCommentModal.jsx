

export function RemoveCommentModal ({isLoggdinUserComment,onToggleRemoveCommentModal,onRemoveComment}){
    return (
        <section className="modal">
           
            {(isLoggdinUserComment)? 
             <button onClick={onRemoveComment} className="red bold">Delete</button> : 
             <button className="red bold">Report</button>}
          
            <button onClick={onToggleRemoveCommentModal}>Cancel</button>
        </section>
    )
}
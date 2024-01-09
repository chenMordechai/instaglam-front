

export function RemoveCommentModal ({isLoggdinUserComment,onToggleRemoveCommentModal}){
    return (
        <section className="modal">
           
            <button className="red bold"> {(isLoggdinUserComment)? 'Delete' :'Report'}</button>
            <button onClick={onToggleRemoveCommentModal}>Cancel</button>
        </section>
    )
}
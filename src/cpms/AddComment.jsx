import {useState , useRef} from 'react'

import {Img} from './Img'
import gif from '../assets/icons/gif.png'
import {postService} from '../services/post.service'

export function AddComment ({loggedinUserImg , username ,onAddCommentToPost}){
    const [comment, setComment] = useState(postService.getEmptyComment())
   const emojis = ['❤️','🙌','🔥','👏','😥','😍','😮','😂']
    
    const inputTxt = useRef()


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

    function onAddEmojiToComment(emoji){
        const newTxt = comment.txt + emoji
        setComment(prevComment => ({ ...prevComment, txt: newTxt }))
        inputTxt.current.focus()
    }

    return (
        <section className="add-comment">
            <div className="emoji-container">
                {emojis.map(e => <span key={e} onClick={()=>onAddEmojiToComment(e)} >
                    {e}
                    </span>)}
            </div>
            <div className="form-container">
                <div className="side-left-container">

                <div className="img-container">
            <Img imgUrl={loggedinUserImg} className="regular"/>
                </div>
                </div>
            <form onSubmit={onSubmitForm} >
                <input ref={inputTxt} type="text" onChange={handleChange} value={comment.txt} name="txt" placeholder={`Add a comment for ${username}...`} />
            </form>
            <button>
         <img className="gif" src={gif} />

            </button>
            </div>
        </section>
    )
}
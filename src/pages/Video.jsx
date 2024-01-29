import { useEffect } from "react";
import { useSelector } from "react-redux";

import {loadPosts } from '../store/actions/post.actions.js'
import { PostMedia } from "../cmps/PostMedia";
import { PostVideoControls } from "../cmps/PostVideoControls";


export function Video (){
    const { posts } = useSelector(storeState => storeState.postModule)
    // const { loggedinUser } = useSelector(storeState => storeState.userModule)
    useEffect(() => {
        init()
    }, [])

    async function init() {
        const filterBy = {type: 'video'}
        try {
            await loadPosts(filterBy)

        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className="video">

            {/* <div className="video-container"> */}
            <ul>{posts.map(post=><li key={post._id}>
                <PostMedia type={post.type} url={post.url} filter={post.imgFilter}  />
                <PostVideoControls by={post.by} />
            </li>)}</ul>
            {/* </div> */}
        </section>
    )
}
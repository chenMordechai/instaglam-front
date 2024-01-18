import { useEffect } from "react";
import { useSelector } from "react-redux";

import {loadPosts } from '../store/actions/post.actions.js'
import { PostMedia } from "../cpms/PostMedia";
import { PostVideoControls } from "../cpms/PostVideoControls";


export function Video (){
    const { posts } = useSelector(storeState => storeState.postModule)
    console.log('posts:', posts)
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
            <h1>video</h1>

            <ul>{posts.map(post=><li key={post._id}>
                <PostMedia type={post.type} url={post.url} filter={post.imgFilter}  />
                <PostVideoControls  />
            </li>)}</ul>
        </section>
    )
}
import { useOutletContext } from "react-router-dom";
import { GridPosts } from "./GridPosts";

export function UserPosts (){
    const postsMini = useOutletContext();
    console.log('postsMini:', postsMini)
// const postsMini = [{_id:"p101",imgUrl:"https://res.cloudinary.com/dnluclrao/image/upload/v1703789224/8ee74727-ff3b-4293-ad21-a0f551a1f36c_qppfii.jpg", likeCount:56,commentCount:23},
// {_id:"p102",imgUrl:"https://res.cloudinary.com/dnluclrao/image/upload/v1703789224/8ee74727-ff3b-4293-ad21-a0f551a1f36c_qppfii.jpg", likeCount:56,commentCount:23},
// {_id:"p103",imgUrl:"https://res.cloudinary.com/dnluclrao/image/upload/v1703789224/8ee74727-ff3b-4293-ad21-a0f551a1f36c_qppfii.jpg", likeCount:56,commentCount:23},
// {_id:"p104",imgUrl:"https://res.cloudinary.com/dnluclrao/image/upload/v1703789224/8ee74727-ff3b-4293-ad21-a0f551a1f36c_qppfii.jpg", likeCount:56,commentCount:23},
// {_id:"p105",imgUrl:"https://res.cloudinary.com/dnluclrao/image/upload/v1703789224/8ee74727-ff3b-4293-ad21-a0f551a1f36c_qppfii.jpg", likeCount:56,commentCount:23},
// {_id:"p106",imgUrl:"https://res.cloudinary.com/dnluclrao/image/upload/v1703789224/8ee74727-ff3b-4293-ad21-a0f551a1f36c_qppfii.jpg", likeCount:56,commentCount:23},
// {_id:"p107",imgUrl:"https://res.cloudinary.com/dnluclrao/image/upload/v1703789224/8ee74727-ff3b-4293-ad21-a0f551a1f36c_qppfii.jpg", likeCount:56,commentCount:23}]
    return (
        <section className="user-posts">
{/* <ul className="grid-container">{postsMini.map(post=> <li key={post._id}>
    <img src={post.imgUrl} />
</li>)}</ul> */}
<GridPosts posts={postsMini}/>
        </section>
    )
}
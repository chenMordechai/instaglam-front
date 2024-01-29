import { useOutletContext } from "react-router-dom";
import { GridPosts } from "./GridPosts";

export function UserPosts() {
    const postsMini = useOutletContext();
    return (
        <section className="user-posts">
            <GridPosts posts={postsMini} />
        </section>
    )
}
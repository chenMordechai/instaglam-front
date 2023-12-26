 import { Stories } from "../cpms/Stories";
 import { Posts } from "../cpms/Posts";

export function Home() {
    return (
        <section className="home">
            <Stories/>
            <Posts/>

        </section>
    )
}
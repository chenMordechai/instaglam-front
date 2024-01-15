import { User } from "./User";
import { Carousel } from "./Carousel";
// import { MiniPlus } from "./MiniPlus";

export function Users({ users }) {
    return (
        <section className="users">
            <Carousel items={users} Comp1={User} />
        </section>
    )
}
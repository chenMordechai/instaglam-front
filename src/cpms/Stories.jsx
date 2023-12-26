import { Story } from "./Story";


export function Stories() {
    const stories = [{},{},{},{}]
    return (
        <section className="stories">
            <h1>Stories</h1>
            {stories.forEach(story => {
                <Story/>
            })}
        </section>
    )
}
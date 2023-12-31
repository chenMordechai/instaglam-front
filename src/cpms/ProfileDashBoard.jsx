

export function ProfileDashBoard({postsLength,followingLength,followersLength}) {
    return (
        <section className="profile-dash-board">
            <div><h3>{postsLength}</h3> <span>posts</span></div>
                <div><h3>{followersLength}</h3> <span> followers</span></div>
                <div><h3>{followingLength}</h3><span> following</span></div>
        </section>
    )
}
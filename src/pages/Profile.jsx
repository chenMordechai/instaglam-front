import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { PostList } from "../cpms/PostList";
import { ProfileDashBoard } from "../cpms/ProfileDashBoard";
import { ProfileHighLight } from "../cpms/ProfileHighLight";
import { ProfileInfo } from "../cpms/ProfileInfo";
import { userService } from "../services/user.service.js";


export function Profile() {
    const [user, setUser] = useState(null)
    // const { loggedinUser } = useSelector(storeState => storeState.userModule)
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        try {
            const user = await userService.getById(userId)
            console.log('user', user)
            setUser(user)
        } catch (err) {
            console.log('user action -> Cannot load user', err)
            navigate('/')
        }
    }
    if(!user) return
    const { username, fullname, imgUrl, description  , postsIdxs , followers , following} = user
    return (
        <section className="profile">
            <ProfileInfo username={username} fullname={fullname} imgUrl={imgUrl} description={description} postsLength={postsIdxs.length} followingLength={following.length} followersLength={followers.length} />
            <ProfileHighLight />
            <ProfileDashBoard />
            <PostList />
        </section>
    )
}
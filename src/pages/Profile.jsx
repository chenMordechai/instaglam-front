import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { ProfileHeader } from "../cpms/ProfileHeader";
import { ProfileInfo } from "../cpms/ProfileInfo";
import { ProfileHighlight } from "../cpms/ProfileHighlight";
import { ProfileDashBoard } from "../cpms/ProfileDashBoard";
import { PostList } from "../cpms/PostList";
import { userService } from "../services/user.service.js";
import {Modal} from '../cpms/Modal'
import { logout } from '../store/actions/user.actions.js'


export function Profile() {
    const [user, setUser] = useState(null)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)

    const [openModal, setOpenModal] = useState(false)

    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
        } catch (err) {
            console.log('user action -> Cannot load user', err)
            navigate('/')
        }
    }

    function isLoggedinUserProfile(){
        if(!loggedinUser) return false
        return loggedinUser.username === username
    }

    function onToggleModal() {
        setOpenModal(prev => !prev)
    }

  async function onLogout(){
        console.log('onLogout')
        try {
            await logout()
            console.log('Success Logout')
            navigate('/')
            // showSuccessMsg('Logout successfully')

        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot logout')
        }
    }

    if (!user) return
    const { username, fullname, imgUrl, description, followers, following, highlights, postsMini } = user
    return (
        <section className="profile">
              {openModal && <Modal onToggleModal={onToggleModal} onLogout={onLogout} />}
            <ProfileHeader onToggleModal={onToggleModal} isLoggedinUserProfile={isLoggedinUserProfile()} username={username} />
            <ProfileInfo onToggleModal={onToggleModal} username={username} fullname={fullname} imgUrl={imgUrl} description={description} postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <ProfileHighlight highlights={highlights} />
            <ProfileDashBoard postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <PostList isLoggedinUserProfile={isLoggedinUserProfile()} userId={userId} postsMini={postsMini} />

        </section>
    )
}
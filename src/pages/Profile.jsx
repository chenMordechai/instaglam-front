import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { ProfileHeader } from "../cpms/ProfileHeader";
import { ProfileInfo } from "../cpms/ProfileInfo";
import { ProfileHighlight } from "../cpms/ProfileHighlight";
import { ProfileDashBoard } from "../cpms/ProfileDashBoard";
import { PostList } from "../cpms/PostList";
import { userService } from "../services/user.service.js";
import { utilService } from "../services/util.service.js";
import { PreferenceModal } from '../cpms/PreferenceModal'
import { ChangeImgModal } from '../cpms/ChangeImgModal'
import { logout, saveUserImg } from '../store/actions/user.actions.js'
import { faL } from "@fortawesome/free-solid-svg-icons";
import { addFollowing, loadUser } from '../store/actions/user.actions.js'


export function Profile() {
    // const [user, setUser] = useState(null)
    const { currUser: user } = useSelector(storeState => storeState.userModule)
    const [isLoading, setIsLoading] = useState(false)
    console.log('user?.followers:', user?.followers)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    const [openPreferenceModal, setOpenPreferenceModal] = useState(false)
    const [openChangeImgModal, setOpenChangeImgModal] = useState(false)

    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        init()
    }, [userId])

    async function init() {
        try {
            await loadUser(userId)
            console.log('user', user)
        } catch (err) {
            console.log('user action -> Cannot load user', err)
            navigate('/')
        }
    }

    function isLoggedinUserProfile() {
        if (!loggedinUser) return false
        return loggedinUser.username === user.username
    }

    function isFollowing() {
        if (!user) return
        if (isLoggedinUserProfile()) return
        // console.log('user:', user)
        // console.log('user.followers:', user.followers)
        const foundUser = user.followers.find(u => u.username === loggedinUser.username)
        if (foundUser) return true
        else return false

    }

 async   function onAddFollowing(){
        const miniUser = {
            _id:user._id,
            username: user.username,
            fullname:user.fullname,
            imgUrl:user.imgUrl

        }
       const updatedUser = await addFollowing(miniUser,loggedinUser)
       console.log('updatedUser:', updatedUser)

    }


    function onTogglePreferencesModal() {
        setOpenPreferenceModal(prev => !prev)
    }

    function onToggleChangeImgModal() {
        setOpenChangeImgModal(prev => !prev)
    }


    async function onLogout() {
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

    async function onChangeImg(ev) {
        try {
            setIsLoading(true)
            const imgUrl = await utilService.uploadImgToCloudinary(ev)
            setUser(() => ({ ...user, imgUrl: imgUrl }))
            await saveUserImg({ ...user, imgUrl: imgUrl })
            onToggleChangeImgModal()
            // showSuccessMsg('Save Toy: ' + savedToy._id)
            // navigate('/toy')
        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot Save Toy')
        } finally {
            setIsLoading(false)
        }
    }

    async function onRemoveImg() {
        const defaultImgUrl = 'https://res.cloudinary.com/dnluclrao/image/upload/v1704182274/user_afklid.jpg'
        try {
            setUser(() => ({ ...user, imgUrl: defaultImgUrl }))
            await saveUserImg({ ...user, imgUrl: defaultImgUrl })
            onToggleChangeImgModal()
            // showSuccessMsg('Save Toy: ' + savedToy._id)
            // navigate('/toy')
        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot Save Toy')
        }
    }



    if (!user) return
    const { _id, username, fullname, imgUrl, bio, followers, following, highlights, postsMini } = user
    console.log('followers, following:', followers, following)
    return (
        <section className="profile">
            {openPreferenceModal && <PreferenceModal onTogglePreferencesModal={onTogglePreferencesModal} onLogout={onLogout} />}
            {openChangeImgModal && <ChangeImgModal isLoading={isLoading} onChangeImg={onChangeImg} onRemoveImg={onRemoveImg} onToggleChangeImgModal={onToggleChangeImgModal} imgUrl={imgUrl} />}
            <ProfileHeader isLoggedinUserProfile={isLoggedinUserProfile()} onTogglePreferencesModal={onTogglePreferencesModal} username={username} />
            <ProfileInfo onAddFollowing={onAddFollowing} isFollowing={isFollowing()} userId={_id} isLoggedinUserProfile={isLoggedinUserProfile()} onToggleChangeImgModal={onToggleChangeImgModal} onTogglePreferencesModal={onTogglePreferencesModal} username={username} fullname={fullname} imgUrl={imgUrl} bio={bio} postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <ProfileHighlight highlights={highlights} />
            <ProfileDashBoard postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <PostList isLoggedinUserProfile={isLoggedinUserProfile()} userId={userId} postsMini={postsMini} />

        </section>
    )
}
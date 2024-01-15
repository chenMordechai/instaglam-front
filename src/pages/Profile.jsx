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
import { ShowImgModal } from '../cpms/ShowImgModal'
import { FollowingModal } from '../cpms/FollowingModal'
import { logout, saveUserImg } from '../store/actions/user.actions.js'
import { faL } from "@fortawesome/free-solid-svg-icons";
import { addFollowing,removeFollowing, loadUser } from '../store/actions/user.actions.js'


export function Profile({isScreenOpen,onOpenScreen,onCloseScreen}) {
    const [isLoading, setIsLoading] = useState(false)
    const [openPreferenceModal, setOpenPreferenceModal] = useState(false)
    const [openChangeImgModal, setOpenChangeImgModal] = useState(false)
    const [openShowImgModal, setOpenShowImgModal] = useState(false)
    const [openFollowingModal, setOpenFollowingModal] = useState(false)
   
    const { currUser: user } = useSelector(storeState => storeState.userModule)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)

    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        init()
    }, [userId])

    async function init() {
        try {
            await loadUser(userId)
            // console.log('user', user)
        } catch (err) {
            console.log('user action -> Cannot load user', err)
            navigate('/')
        }
    }

    useEffect(() => {
        if (openPreferenceModal || openChangeImgModal || openFollowingModal || openShowImgModal ) {
            onOpenScreen()
        } else {
            onCloseScreen()
        }
        
        return ()=>{
            onCloseScreen()
        }

    }, [openPreferenceModal, openChangeImgModal,openFollowingModal,openShowImgModal])

    useEffect(() => {
        if (!isScreenOpen) {
            setOpenPreferenceModal(false)
            setOpenChangeImgModal(false)
            setOpenFollowingModal(false)
            setOpenShowImgModal(false)
        }

    }, [isScreenOpen])

    
    function onTogglePreferencesModal() {
        setOpenPreferenceModal(prev => !prev)
    }

    function onToggleChangeImgModal() {
        setOpenChangeImgModal(prev => !prev)
    }
    function onToggleShowImgModal() {
        setOpenShowImgModal(prev => !prev)
    }

    function onToggleFollowingModal() {
        setOpenFollowingModal(prev => !prev)
    }

    function isLoggedinUserProfile() {
        if (!loggedinUser) return false
        return loggedinUser.username === user.username
    }

    function isFollowing() {
        if (!user) return
        if (isLoggedinUserProfile()) return
        const foundUser = user.followers.find(u => u.username === loggedinUser.username)
        if (foundUser) return true
        else return false

    }

    async function onAddFollowing(){
        const miniUser = {
            _id:user._id,
            username: user.username,
            fullname:user.fullname,
            imgUrl:user.imgUrl
        }
       const updatedUser = await addFollowing(miniUser,loggedinUser)
    }

    async function onRemoveFollowing(){
       await removeFollowing(user._id,loggedinUser._id)
       onToggleFollowingModal()
    }

    async function onLogout() {
        try {
            await logout()
            console.log('Success Logout')
            // onTogglePreferencesModal()
            onCloseScreen()
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
            await saveUserImg({ ...user, imgUrl: imgUrl })
            onToggleChangeImgModal()
            // showSuccessMsg('Save Toy: ' + savedToy._id)
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
    return (
        <section className="profile">
            {openPreferenceModal && <PreferenceModal loggedinUserId={loggedinUser._id} onTogglePreferencesModal={onTogglePreferencesModal} onLogout={onLogout} />}
            {openChangeImgModal && <ChangeImgModal isLoading={isLoading} onChangeImg={onChangeImg} onRemoveImg={onRemoveImg} onToggleChangeImgModal={onToggleChangeImgModal} imgUrl={imgUrl} />}
            {openShowImgModal && <ShowImgModal imgUrl={imgUrl} />}
            {openFollowingModal && <FollowingModal username={username} imgUrl={imgUrl} onRemoveFollowing={onRemoveFollowing} onToggleFollowingModal={onToggleFollowingModal} />}
            <ProfileHeader isLoggedinUserProfile={isLoggedinUserProfile()} onTogglePreferencesModal={onTogglePreferencesModal} username={username} />
            <ProfileInfo onToggleShowImgModal={onToggleShowImgModal} onToggleFollowingModal={onToggleFollowingModal} onAddFollowing={onAddFollowing} isFollowing={isFollowing()} userId={_id} isLoggedinUserProfile={isLoggedinUserProfile()} onToggleChangeImgModal={onToggleChangeImgModal} onTogglePreferencesModal={onTogglePreferencesModal} username={username} fullname={fullname} imgUrl={imgUrl} bio={bio} postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <ProfileHighlight highlights={highlights} />
            <ProfileDashBoard postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <PostList isLoggedinUserProfile={isLoggedinUserProfile()} userId={userId} postsMini={postsMini} />

        </section>
    )
}
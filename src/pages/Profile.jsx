import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { ProfileHeader } from "../cmps/ProfileHeader";
import { ProfileInfo } from "../cmps/ProfileInfo";
import { ProfileHighlight } from "../cmps/ProfileHighlight";
import { ProfileDashBoard } from "../cmps/ProfileDashBoard";
import { PostList } from "../cmps/PostList";
import { utilService } from "../services/util.service.js";
import { PreferenceModal } from '../cmps/PreferenceModal'
import { ChangeImgModal } from '../cmps/ChangeImgModal'
import { ShowImgModal } from '../cmps/ShowImgModal'
import { FollowingModal } from '../cmps/FollowingModal'
import { addFollowing, removeFollowing, loadUser, logout, saveUserImg } from '../store/actions/user.actions.js'
import { useToggle } from '../customHooks/useToggle'
import { useEffectToggleModal } from '../customHooks/useEffectToggleModal'
import { useEffectCloseModal } from '../customHooks/useEffectCloseModal'


export function Profile({ isScreenOpen, onOpenScreen, onCloseScreen }) {
    const  user = useSelector(storeState => storeState.userModule.currUser)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    const [isLoading, setIsLoading] = useState(false)

    const [openPreferenceModal, onTogglePreferencesModal] = useToggle(false)
    const [openChangeImgModal, onToggleChangeImgModal] = useToggle(false)
    const [openShowImgModal, onToggleShowImgModal] = useToggle(false)
    const [openFollowingModal, onToggleFollowingModal] = useToggle(false)
    
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        init()
    }, [userId])

    async function init() {
        try {
            await loadUser(userId)
        } catch (err) {
            console.log('user action -> Cannot load user', err)
            navigate('/')
        }
    }

    useEffectToggleModal(onOpenScreen,onCloseScreen,[openPreferenceModal, openChangeImgModal, openFollowingModal, openShowImgModal])
    useEffectCloseModal(isScreenOpen,[onTogglePreferencesModal,onToggleChangeImgModal,onToggleShowImgModal,onToggleFollowingModal])

    function isLoggedinUserProfile() {
        return loggedinUser._id === user._id
    }

    function isFollowing() {
        if (!user) return
        if (isLoggedinUserProfile()) return
        const foundUser = user.followers.find(u => u._id === loggedinUser._id)
        if (foundUser) return true
        else return false

    }

    async function onAddFollowing() {
        const {_id , username , fullname ,imgUrl} = user
        const miniUser =  {_id , username , fullname ,imgUrl}
        const updatedUser = await addFollowing(miniUser, loggedinUser)
    }

    async function onRemoveFollowing() {
        await removeFollowing(user._id, loggedinUser._id)
        onToggleFollowingModal()
    }

    async function onLogout() {
        try {
            await logout()
            console.log('Success Logout')
            onCloseScreen()
            navigate('/')
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onChangeImg(ev) {
        try {
            setIsLoading(true)
            const media = await utilService.uploadImgToCloudinary(ev)
            await saveUserImg({ ...user, imgUrl: media.url })
            onToggleChangeImgModal()
        } catch (err) {
            console.log('err:', err)
        } finally {
            setIsLoading(false)
        }
    }

    async function onRemoveImg() {
        const defaultImgUrl = 'https://res.cloudinary.com/dnluclrao/image/upload/v1704182274/user_afklid.jpg'
        try {
            await saveUserImg({ ...user, imgUrl: defaultImgUrl })
            onToggleChangeImgModal()
        } catch (err) {
            console.log('err:', err)
        }
    }

    if (!user || !loggedinUser) return
    const { _id, username, fullname, imgUrl, bio, followers, following, highlights, postsMini } = user
    return (
        <section className="profile">
            {openPreferenceModal && <PreferenceModal loggedinUserId={loggedinUser._id} onTogglePreferencesModal={onTogglePreferencesModal} onLogout={onLogout} />}
            {openChangeImgModal && <ChangeImgModal isLoading={isLoading} onChangeImg={onChangeImg} onRemoveImg={onRemoveImg} onToggleChangeImgModal={onToggleChangeImgModal} imgUrl={imgUrl} />}
            {openShowImgModal && <ShowImgModal imgUrl={imgUrl} />}
            {openFollowingModal && <FollowingModal username={username} imgUrl={imgUrl} onRemoveFollowing={onRemoveFollowing} onToggleFollowingModal={onToggleFollowingModal} />}
           
            <ProfileHeader isLoggedinUserProfile={isLoggedinUserProfile()} onTogglePreferencesModal={onTogglePreferencesModal} username={username} />
            <ProfileInfo onToggleShowImgModal={onToggleShowImgModal} onToggleFollowingModal={onToggleFollowingModal} onAddFollowing={onAddFollowing} isFollowing={isFollowing()} userId={_id} isLoggedinUserProfile={isLoggedinUserProfile()} onToggleChangeImgModal={onToggleChangeImgModal} onTogglePreferencesModal={onTogglePreferencesModal} username={username} fullname={fullname} imgUrl={imgUrl} bio={bio} postsLength={postsMini.length} followingLength={following.length} followers={followers} />
            <ProfileHighlight highlights={highlights} />
            <ProfileDashBoard postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <PostList isLoggedinUserProfile={isLoggedinUserProfile()} userId={userId} postsMini={postsMini} />

        </section>
    )
}
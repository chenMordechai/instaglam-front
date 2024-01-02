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
import {PreferenceModal} from '../cpms/PreferenceModal'
import {ChangeImgModal} from '../cpms/ChangeImgModal'
import { logout , saveUser } from '../store/actions/user.actions.js'


export function Profile() {
    const [user, setUser] = useState(null)
    // console.log('user:', user)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)

    const [openPreferenceModal, setOpenPreferenceModal] = useState(false)
    const [openChangeImgModal, setOpenChangeImgModal] = useState(false)

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

    function onTogglePreferencesModal() {
        setOpenPreferenceModal(prev => !prev)
    }

    function onToggleChangeImgModal(){
        setOpenChangeImgModal(prev=>!prev)
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

    async  function onChangeImg(ev) {
        console.log(user)
        const imgUrl = await utilService.uploadImgToCloudinary(ev)
        // console.log('imgUrl:', imgUrl)
        try {
            setUser(prevUser => ({ ...user, imgUrl: imgUrl }))
            const savedUser = await saveUser({ ...user, imgUrl: imgUrl })
            console.log('savedUser:', savedUser)
            // showSuccessMsg('Save Toy: ' + savedToy._id)
            // navigate('/toy')
        } catch (err) {
            console.log('err:', err)
            // showErrorMsg('Cannot Save Toy')
        }
     }

    function onRemoveImg(){

    }

   

    if (!user) return
    const { username, fullname, imgUrl, description, followers, following, highlights, postsMini } = user
    return (
        <section className="profile">
              {openPreferenceModal && <PreferenceModal onTogglePreferencesModal={onTogglePreferencesModal} onLogout={onLogout} />}
              {openChangeImgModal && <ChangeImgModal onChangeImg={onChangeImg} onRemoveImg={onRemoveImg} onToggleChangeImgModal={onToggleChangeImgModal}  imgUrl={imgUrl}/>}
            <ProfileHeader onTogglePreferencesModal={onTogglePreferencesModal} isLoggedinUserProfile={isLoggedinUserProfile()} username={username} />
            <ProfileInfo onToggleChangeImgModal={onToggleChangeImgModal} onTogglePreferencesModal={onTogglePreferencesModal} username={username} fullname={fullname} imgUrl={imgUrl} description={description} postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <ProfileHighlight highlights={highlights} />
            <ProfileDashBoard postsLength={postsMini.length} followingLength={following.length} followersLength={followers.length} />
            <PostList isLoggedinUserProfile={isLoggedinUserProfile()} userId={userId} postsMini={postsMini} />

        </section>
    )
}
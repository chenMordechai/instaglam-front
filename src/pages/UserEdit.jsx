import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { utilService } from "../services/util.service.js";
import { saveUserImg, saveUser } from '../store/actions/user.actions.js'
import { userService } from "../services/user.service.js";
import { SimpleHeader } from "../cmps/SimpleHeader";
import { useForm } from '../customHooks/useForm'

export function UserEdit() {
    const [user, setUser,handleChange] = useForm(null)

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

    async function onChangeImg(ev) {
        const imgUrl = await utilService.uploadImgToCloudinary(ev)
        try {
            setUser(() => ({ ...user, imgUrl: imgUrl }))
            await saveUserImg({ ...user, imgUrl: imgUrl })
        } catch (err) {
            console.log('err:', err)
        }
    }

 

    async function onSubmitForm(ev) {
        ev.preventDefault()
        try {
            const savedUser = await saveUser({ ...user })
            navigate(-1)
        } catch (err) {
            console.log('err:', err)
        }
    }


    if (!user) return ''
    return (
        <section className="user-edit">
            <div className="header-container">
            <SimpleHeader h2Content="Edit Profile" />
            </div>

            <div className="edit-container">
                <h2>Edit profile</h2>
                <form onSubmit={onSubmitForm}>
                    <div className="change-photo-container">
                        <img src={user.imgUrl} />

                        <label className="clr-blue bold" htmlFor="imgFile">
                            Edit picture
                            <input type="file" id="imgFile" onChange={onChangeImg} />
                        </label>
                    </div>

                    <label htmlFor="fullname">
                        Full Name
                        <input onChange={handleChange} value={user.fullname} name="fullname" type="text" id="fullname" />
                    </label>
                    <label htmlFor="fullname">
                        Username
                        <input onChange={handleChange} value={user.username} name="username" type="text" id="fullname" />
                    </label>

                    <label htmlFor="bio">
                        Bio
                        <textarea onChange={handleChange} value={user.bio} name="bio" type="text" id="bio" />
                    </label>

                    <button>save</button>
                </form>
            </div>
        </section>
    )
}
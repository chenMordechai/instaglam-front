import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


import { userService } from "../services/user.service.js";
import { UserEditHeader } from "../cpms/UserEditHeader";

export function UserEdit (){
    const [user, setUser] = useState(null)

    const { userId } = useParams()

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
    return (
        <section className="user-edit">
            <UserEditHeader userId={userId}/>

            <div className="edit-container">
            
            <h2>Edit profile</h2>
            <form>
            <div className="change-photo-container">
            {/* <img  src={imgUrl } /> */}

            <div className="name-container">
                <h3>username</h3>
                <span>fullname</span>
            </div>

            <button className="blue bold">
                <label htmlFor="imgFile">
                Upload Photo
                {/* <input type="file" id="imgFile" onChange={onChangeImg} /> */}
                </label>
                </button>
            </div>

            <label htmlFor="fullname">
                <input type="text" id="fullname" />
            </label>

            <label htmlFor="bio">
                <input type="text" id="bio" />
            </label>
        
            </form>
            </div>
        </section>
    )
}
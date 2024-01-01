
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import logo from '../assets/icons/logo.svg'
import facebook from '../assets/icons/facebook-logo.png'
import { userService } from '../services/user.service.js';
import { login } from '../store/actions/user.actions.js'

export function Login({ setNavLinksDisplay }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    // const [isSignupState, setIsSignupState] = useState(false)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    console.log('loggedinUser:', loggedinUser)
    const navigate = useNavigate()

    useEffect(() => {
        setNavLinksDisplay('none')
        if (loggedinUser) navigate('/home')
        return () => {
            setNavLinksDisplay('')
        }
    }, [])

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            // await login(credentials)
            const user = await login(credentials)
            console.log('success login', user)
            navigate('/home')
            // showSuccessMsg(`Hi again ${user.fullname}`)

        } catch (err) {
            // showErrorMsg('Cannot login')
        }
    }

    const { username, password } = credentials
    return (
        <section className="login">
            <div className="login-container">

                <img className="logo" src={logo} />

                <form onSubmit={onSubmit}>
                    <input onChange={handleCredentialsChange} value={username} type="text" placeholder="Phone numbers, username, or email" />
                    <input onChange={handleCredentialsChange} value={password} type="text" placeholder="Password" />
                    <button>Log in</button>
                </form>

                <div className="or-container">
                    <div className="line"></div>
                    <h3>OR</h3>
                    <div className="line"></div>
                </div>

                <div className="fb-container">
                    <img className="fb" src={facebook} />
                    <h3> Log in with Facebook</h3>
                </div>

                <span>Forgot password?</span>
            </div>

            <div className="signup-container">
                <h2>Don't have an account? <span>Sign up</span></h2>
            </div>

        </section>
    )
}
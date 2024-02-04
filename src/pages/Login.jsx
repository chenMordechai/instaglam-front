
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import logo from '../assets/icons/logo.svg'
import facebook from '../assets/icons/facebook-logo.png'
import { userService } from '../services/user.service.js';
import { login, signup } from '../store/actions/user.actions.js'
import { useForm } from '../customHooks/useForm'

export function Login({ setNavLinksDisplay }) {
    const  loggedinUser  = useSelector(storeState => storeState.userModule.loggedinUser)

    const [isSignupState, setIsSignupState] = useState(false)
  
    const [credentials, setCredentials,handleCredentialsChange] = useForm(userService.getEmptyCredentials())

    const navigate = useNavigate()

    useEffect(() => {
        setNavLinksDisplay('none')
        if (loggedinUser) navigate('/home')
        return () => {
            setNavLinksDisplay('')
        }
    }, [])

    async function onSubmit(ev) {
        ev.preventDefault()
        const func = isSignupState ? signup : login
            try {
                const user = await func(credentials)
                console.log('success signup / login', user)
                navigate('/home')
            } catch (err) {
                console.log('err:', err)
            }
    }

    function onSetSignup() {
        setCredentials(() => ({ ...credentials, username: '', password: '' }))
        setIsSignupState(prev => !prev)
    }

    const { username, password, email, fullname } = credentials
    return (
        <section className="login">
            <div className="login-container">

                <img className="logo" src={logo} />

                <form onSubmit={onSubmit}>
                    <input required onChange={handleCredentialsChange} value={username} type="text" placeholder="*Username" name="username" />
                    <input required onChange={handleCredentialsChange} value={password} type="text" placeholder="*Password" name="password" />
                    {isSignupState && <>
                        <input required onChange={handleCredentialsChange} value={fullname} type="text" placeholder="*Full Name" name="fullname" />
                        <input onChange={handleCredentialsChange} value={email} type="email" placeholder="Email" name="email" />
                    </>}
                    <button>{isSignupState ? 'Sign up' : 'Log in'}</button>
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

                {!isSignupState && <>
                    <span>Forgot password?</span>
                </>}
            </div>

            <div className="signup-container">
                {!isSignupState && <h2>Don't have an account? <button onClick={onSetSignup}>Sign up</button></h2>}
                {isSignupState && <h2>Have an account? <button onClick={() => { setIsSignupState(prev => !prev) }}>Log in</button></h2>}
            </div>

        </section>
    )
}
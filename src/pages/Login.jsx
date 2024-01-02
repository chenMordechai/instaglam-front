
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Fragment } from 'react';

import logo from '../assets/icons/logo.svg'
import facebook from '../assets/icons/facebook-logo.png'
import { userService } from '../services/user.service.js';
import { login , signup } from '../store/actions/user.actions.js'

export function Login({ setNavLinksDisplay }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
//    console.log('credentials:', credentials)
    const [isSignupState, setIsSignupState] = useState(false)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    // console.log('loggedinUser:', loggedinUser)
    const navigate = useNavigate()

    useEffect(() => {
        setNavLinksDisplay('none')
        if (loggedinUser) navigate('/home')
        return () => {
            setNavLinksDisplay('')
        }
    }, [])

    function handleCredentialsChange(ev) {
        console.log('hi')
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        if (isSignupState) {
            try {
                const user = await signup(credentials)
                console.log('success signup', user)
                navigate('/home')
                // showSuccessMsg(`Welcome ${user.fullname}`)
            } catch (err) {
                console.log('err:', err)
                // showErrorMsg('Cannot signup')
            }
        } else {
            try {
                const user = await login(credentials)
                console.log('success login', user)
                navigate('/home')
                // showSuccessMsg(`Hi again ${user.fullname}`)
            } catch (err) {
                console.log('err:', err)
                // showErrorMsg('Cannot login')
            }

        }
      
    }

    function onSetSignup(){
        setCredentials(()=>({...credentials , username:'' , password:''}))
        setIsSignupState(prev=>!prev)
    }

    const { username, password,email,fullname } = credentials
    return (
        <section className="login">
            <div className="login-container">

                <img className="logo" src={logo} />

                <form onSubmit={onSubmit}>
                    <input required onChange={handleCredentialsChange} value={username} type="text" placeholder="*Username" name="username" />
                    <input required onChange={handleCredentialsChange} value={password} type="text" placeholder="*Password" name="password" />            
                {isSignupState && <Fragment> 
                    <input required onChange={handleCredentialsChange} value={fullname} type="text" placeholder="*Full Name" name="fullname" />            
                    <input onChange={handleCredentialsChange} value={email} type="email" placeholder="Email" name="email" />
                    </Fragment>}
                    <button>{isSignupState? 'Sign up' :'Log in'}</button>
                </form>

                <div className="or-container">
                    <div className="line"></div>
                    <h3>OR</h3>
                    <div className="line"></div>
                </div>

             { !isSignupState && <Fragment> 
                 <div className="fb-container">
                    <img className="fb" src={facebook} />
                    <h3> Log in with Facebook</h3>
                </div>

                <span>Forgot password?</span>
                </Fragment>}
            </div>

            <div className="signup-container">
                {!isSignupState &&<h2>Don't have an account? <button onClick={onSetSignup}>Sign up</button></h2>}
                { isSignupState && <h2>Have an account? <button onClick={()=>{setIsSignupState(prev=>!prev)}}>Log in</button></h2>}
            </div>

        </section>
    )
}

import {useEffect } from "react"
import {useParams } from "react-router-dom"

import logo from '../assets/icons/logo.svg'
import facebook from '../assets/icons/facebook-logo.png'

export function Login ({setNavLinksDisplay}){
    useEffect(()=>{
        setNavLinksDisplay('none')
        return ()=>{
            setNavLinksDisplay('')
        }
    },[])
    return (
        <section className="login">
            <div className="login-container">

            <img className="logo" src={logo} />
            <form>
            <input type="text" placeholder="Phone numbers, username, or email" />
            <input type="text" placeholder="Password" />
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
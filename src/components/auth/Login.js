import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";

const Login = (props) => {
    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const userRef = useRef()
    const errRef = useRef()

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [check, toggleCheck] = useToggle('persist', false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = (e) => {
        e.preventDefault()

        const req = {
            username: user,
            password: pwd
        }

        axios.post(
            `http://localhost:8081/api/v1/auth/login`,
            req,
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        )
            .then(response => {
                const accessToken = response?.data?.accessToken
                const roles = response?.data?.roles
                setAuth({user, accessToken, roles})
                resetUser()
                setPwd('')
                console.log(`after login in memory: username=${user} pwd=${pwd}`)
                console.log(`accessToken=${accessToken}`)
                navigate(from, {replace: true})
            })
            .catch(error => {
                if (!error?.response) {
                    setErrMsg('no server response')
                } else if (error.response?.status === 400) {
                    setErrMsg('Missing username or password')
                } else if (error.response?.status === 401) {
                    setErrMsg('Unauthorized')
                } else if (error.response?.status === 403) {
                    setErrMsg('Forbidden')
                } else {
                    setErrMsg('Login failed')
                }
                errRef.current.focus()
            })
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Username:
                </label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    {...userAttribs}
                    required
                />
                <label htmlFor='password'>
                    Password:
                </label>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <p>
                Need an Account?<br/>
                <span className='line'>
                     {/*put router link here*/}
                    <a href='#'>Sign Up</a>
                </span>
            </p>
        </section>
    );
}

export default Login;
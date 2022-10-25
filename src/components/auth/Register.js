import React, {Fragment, useEffect, useRef, useState} from 'react';
import {faCheck, faInfoCircle, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from "axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z\d-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/

const Register = (props) => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(`pwd: ${pwd}`)
        console.log(`cnf: ${matchPwd}`)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [pwd, matchPwd, user])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const vUser = USER_REGEX.test(user)
        const vPwd = PWD_REGEX.test(pwd);
        if (!vUser || !vPwd) {
            console.log("Invalid user or password")
            return;
        }

        const req = {
            username: user,
            password: pwd,
            email: 'demo@gmail.com'
        }

        axios.post(`http://localhost:8081/api/v1/auth/register`, req)
            .then(response => {
                console.log(response.data)
                setSuccess(true)
            })
            .catch(error => {
                if (!error?.response) {
                    setErrMsg('no server response')
                } else if (error.response?.status === 409) {
                    setErrMsg('username taken')
                } else {
                    setErrMsg('Registration failed')
                }
                errRef.current.focus()
                setSuccess(false)
            })
    }

    return (
        <Fragment>
            {
                success ? (
                        <section>
                            <h1>Success!</h1>
                            <p>
                                <a href='#'>Sign In</a>
                            </p>
                        </section>
                    ) :
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                Username:
                                <span className={validName ? 'valid' : 'hide'}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validName || !user ? 'hide' : 'invalid'}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby='uidnote'
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                4 to 24 characters.<br/>
                                Must begin with a letter.<br/>
                                Letter, number, underscore, hyphens, allowed.
                            </p>

                            <label htmlFor='password'>
                                Password:
                                <span className={validPwd ? 'valid' : 'hide'}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input
                                type='password'
                                id='password'
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? 'false' : 'true'}
                                aria-describedby='pwdnode'
                                onFocus={(e) => setPwdFocus(true)}
                                onBlur={(e) => setPwdFocus(false)}
                            />
                            <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                8 to 24 characters.<br/>
                                Must include uppercase and lowercase letters, number and special character.<br/>
                                Allowed special characters: <span aria-label='exclamation mark'>!</span>
                                <span aria-label='at symbol'>@</span>
                                <span aria-label='hashtag'>#</span>
                                <span aria-label='dollar sign'>$</span>
                                <span aria-label='percent'>%</span>
                            </p>
                            <label htmlFor='confirm_pwd'>
                                Confirm Password:
                                <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input
                                type='password'
                                id='confirm_pwd'
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? 'false' : 'true'}
                                aria-describedby='confirmnote'
                                onFocus={(e) => setMatchFocus(true)}
                                onBlur={(e) => setMatchFocus(false)}
                            />
                            <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Must match the first password input field
                            </p>
                            <button type='submit' disabled={!validName || !validPwd || !validMatch}>
                                Sign Up
                            </button>
                        </form>
                        <p>
                            Already registered?<br/>
                            <span className="line">
                                {/*put router link here*/}
                                <a href='#'>Sign In</a>
                            </span>
                        </p>
                    </section>
            }
        </Fragment>
    );
}

export default Register;
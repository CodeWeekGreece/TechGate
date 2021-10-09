import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { userRegister } from '../../redux/actions/authActions';

import { Link } from 'react-router-dom';

import Alert from '../../components/alerts/alerts';

import "./register.css";

const Register = (props) => {
    const [fields, setField] = useState({ email: "", username: "", first_name: "", last_name: "", password: "", password2: "" })

    useEffect(() => {}, [fields]);

    const dispatch = useDispatch();

    function handleChange(event) {
        setField({ ...fields, [event.target.name]: event.target.value })
    };

    function handleSubmit() {
        window.event.preventDefault();
        dispatch(userRegister(fields));
    };

    return (
        <div className="register">
            <div className="register-frame">
                {props.all_messages.map(message => {
                    return <Alert message={message[1]} type={message[0]} key={message.id} />
                })}
                <form method="post" className="form-container" onSubmit={handleSubmit} >
                    <div className="field email-container">
                        <label htmlFor="email" className="label email-label">Email: </label>
                        <input type="email" name="email" id="email" placeholder="Email" autoFocus onChange={handleChange} required />
                        <div className="line email-line"></div>
                    </div>

                    <div className="field username-container">
                        <label htmlFor="username" className="label username-label">Username: </label>
                        <input type="text" name="username" id="username" placeholder="Username" minLength={4} onChange={handleChange} required />
                        <div className="line password-line"></div>
                    </div>

                    <div className="holder names-holder">
                        <div className="nested-field first-name-container">
                        <label htmlFor="first-name" className="label first-name-label">First Name: </label>
                            <input type="text" name="first_name" id="first-name" placeholder="First Name" minLength={4} onChange={handleChange} required />
                            <div className="nested-line first-name-line"></div>
                        </div>
                        <div className="nested-field last-name-field">
                        <label htmlFor="last-name" className="label last-name-label">Last Name: </label>
                            <input type="text" name="last_name" id="last-name" placeholder="Last Name" minLength={4} onChange={handleChange} required />
                            <div className="nested-line last-name-line"></div>
                        </div>
                    </div>

                    <div className="holder passwords-holder">
                        <div className="nested-field password-container">
                        <label htmlFor="password" className="label password-label">Password: </label>
                            <input type="password" name="password" id="password" placeholder="Password" minLength={8} onChange={handleChange} required />
                            <div className="nested-line password-line"></div>
                        </div>
                        <div className="nested-field password2-container">
                        <label htmlFor="password2" className="label password2-label">Confirm Password: </label>
                            <input type="password" name="password2" id="password2" placeholder="Confirm Password" minLength={8} onChange={handleChange} required />
                            <div className="nested-line password2-line"></div>
                        </div>
                    </div>

                    <div className="login-register-btns">
                        <input type="submit" className="register-btn" value="Register" />
                        <Link to="/login" className="login-btn">Login</Link>
                    </div>
                </form>
            </div>
            <div className="triangle"></div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        logged_in: state.auth.logged_in,
        all_messages: state.msg.messages,
    };
};

export default connect(mapStateToProps)(Register);
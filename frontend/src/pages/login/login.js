import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/authActions';

import Alert from '../../components/alerts/alerts';

import "./login.css";


const Login = (props) => {
    const [fields, setField] = useState({ email: "", password: "", submited: false })

    const dispatch = useDispatch();

    function handleChange(event) {
        setField({ ...fields, [event.target.name]: event.target.value });
    };

    function handleSubmit() {
        window.event.preventDefault();
        dispatch(userLogin(fields));
        setField({
            ...fields,
            submited: true,
        });
    };

    return (
        <div className="login">
            <div className="login-frame">
                <form method="post" onSubmit={handleSubmit} className="form-container">
                    {props.all_messages.map(message => {
                        return <Alert message={message[1]} type={message[0]} key={message.id} />
                    })}

                    <div className="email-container">
                        <label htmlFor="email" className="label email-label">Email: </label>
                        <input type="email" name="email" placeholder="Email" id="email" className="email" autoFocus onChange={handleChange} required />
                        <div className="line email-line"></div>
                    </div>

                    <div className="password-container">
                        <label htmlFor="password" className="label password-label">Password: </label>
                        <input type="password" name="password" placeholder="Password" id="password" className="password" minLength={8} onChange={handleChange} required />
                        <div className="line password-line"></div>
                    </div>

                    <div className="login-btns">
                        <input type="submit" className="login-btn" value="Login" />
                        <Link to="/register" className="register-btn">Register</Link>
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

export default connect(mapStateToProps)(Login);
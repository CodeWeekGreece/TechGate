import React, { useState, useEffect } from "react";

import { connect, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import Nav from "../../components/nav/nav";
import { getUserData } from "../../redux/actions/authActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import "./account.css"

const Account = props => {
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({ data: [] })

    useEffect(() => {
        fetchData()
    }, [dispatch, props.user_data]);

    function fetchData() {
        if (props.user_data.email !== undefined) {
            setUserData({data: props.user_data});
        } else {
            dispatch(getUserData());
        };
    };

    return (
        <div className="user-info">
            <Nav />
            <div className="info-wrapper">
                <h1>Account</h1>
                <div className="info-container">
                    <div className="info-fields">
                        <label htmlFor="email">Email: </label>
                        <p className="field email">{userData.data.email}</p>
                        <label htmlFor="username">Username: </label>
                        <p className="field username">{userData.data.username}</p>
                        <label htmlFor="first_name">First Name: </label>
                        <p className="field first_name">{userData.data.first_name}</p>
                        <label htmlFor="last_name">Last Name: </label>
                        <p className="field last_name">{userData.data.last_name}</p>

                        <div className="buttons-wrapper">
                            <Link to="/create-shop" className="btn btn-primary">Create Shop Accout</Link>
                            <Link to="/logout" className="logout btn btn-danger">Logout <FontAwesomeIcon icon={faSignOutAlt} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user_data: state.auth.data
    };
};

export default connect(mapStateToProps)(Account);
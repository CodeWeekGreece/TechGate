import axiosInstance from "../../axiosInstance";

import messagesAction from "./messagesAction";

export function getUserData() {
    return function(dispatch) {
        axiosInstance
        .get("/auth/validate/")
        .then(response => {
            dispatch({ type: "GET_USER_DATA", payload: response.data })
        })
        .catch(error => console.log(error));
    };
};

export function userLogin(data) {
    return function(dispatch) {
        axiosInstance
        .post("/auth/login/", data)
        .then(response => {
            dispatch({ type: "LOGIN", payload: response.data });
            window.location.reload();
        })
        .catch(error => {
            console.log(error.response)
            dispatch(messagesAction(["danger", error.response.data.detail]))
        });
    };
};

export function userRegister(data) {
    return function(dispatch) {
        axiosInstance
        .post("/auth/register/", data)
        .then(response => {
            dispatch({ type: "REGISTER", payload: response.data })
            dispatch(messagesAction(["success", "Account created successfully. Go to <a href=\"/login\">Login</a> to continue."]))
        })
        .catch(error => {
            function getErrors() {
                const messages = [];
                for (let index in error.response.data) {
                    messages.push(error.response.data[index]);
                };
                return messages.join("\n");
            };
            let messages = getErrors()
            dispatch(messagesAction(["danger", messages]));
        });
    };
};

export function isLoggedIn() {
    return function(dispatch) {
        axiosInstance
        .get("/auth/validate/")
        .then(response => {
            dispatch({ "type": "IS_LOGGED_IN", payload: true });
        })
        .catch(error => {
            dispatch({ "type": "IS_LOGGED_IN", payload: false });
        });
    };
};

export function logout() {
    return function(dispatch) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch({ "type": "LOGOUT", payload: false })
    };
};
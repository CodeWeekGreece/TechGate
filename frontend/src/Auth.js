import axiosInstance from "./axiosInstance";

const IsAuth = () => {
    const token = localStorage.getItem("access_token");

    if (token !== null) {
        const promise = axiosInstance
        .get("auth/validate/")
        .then(response => {
            if (response.status === 200) {
                return true;
            } else {
                return null;
            };
        })
        .catch(error => {
            if (error.status === 401) {
                return null;
            } else {
                return null;
            };
        });
        return promise;
    };
};

export default IsAuth;
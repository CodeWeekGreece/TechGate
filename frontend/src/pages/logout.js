const Logout = () => {
    const remove_data = async () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.replace("/login");
    };

    return remove_data();
};

export default Logout;  
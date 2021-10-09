export default function authReducer(state = { data: [] }, action) {
    switch(action.type) {
        case "LOGIN":
            localStorage.setItem("access_token", action.payload.access);
            localStorage.setItem("refresh_token", action.payload.refresh);
            return {
                ...state,
                logged_in: true,
            };
            
        case "REGISTER":
            return {
                ...state,
                data: action.payload,
                // id: action.payload.id,
                // username: action.payload.username,
                // first_name: action.payload.first_name,
                // last_name: action.payload.last_name,
                // email: action.payload.email,
            };

        case "GET_USER_DATA":
            return {
                ...state,
                data: action.payload,
                // id: action.payload.id,
                // username: action.payload.username,
                // first_name: action.payload.first_name,
                // last_name: action.payload.last_name,
                // email: action.payload.email,
            };
            
        case "IS_LOGGED_IN":
            return {
                ...state,
                logged_in: action.payload,
            };

        case "LOGOUT":
            return {
                ...state,
                logged_in: false,
            };

        default:
            return state;
    };
};
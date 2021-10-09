export default function shopReducer(state = {
    all_shops: [], 
    favourites: [], 
    current_shop: [], 
    comments: [], 
    user_bookings: [],
    bookings: [], 
    shop_owned: [], 
    search_results: [],
}, action) {
    switch(action.type) {
        case "GET_SHOPS":
            return {
                ...state, 
                all_shops: action.payload,
            };

        case "GET_SHOP":
            return {
                ...state, 
                current_shop: [
                    ...state.current_shop, 
                    action.payload
                ],
            };

        case "GET_USER_BOOKINGS":
            return {
                ...state,
                user_bookings: action.payload,
            };

        case "GET_BOOKINGS":
            return {
                ...state,
                bookings: [
                    ...state.bookings,
                    action.payload,
                ],
            };

        case "GET_COMMENTS":
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.payload,
                ],
            };

        case "GET_POSTS":
            return {
                ...state,
                posts: action.payload,
            };

        case "GET_FAV":
            return {
                ...state,
                favourites: action.payload,
            };

        case "ADD_FAV":
            return {
                ...state,
                favourites: [
                    ...state.favourites, action.payload
                ],
            };

        case "REMOVE_FAV":
            function getFavIndex() {
                for (let index in state.favourites) {
                    if (state.favourites[index].id === action.payload){
                        return index
                    };
                };
            };

            const new_favourites = [...state.favourites];
            new_favourites.splice(getFavIndex(), 1)
            
            return {
                ...state,
                favourites: new_favourites,
                // ...state.favourites.slice(0, getIndex()),
            };
            
            case "CREATE_SHOP":
                return {
                    ...state,
                    shop_owned: [...action.payload],
                };
                
            case "SEARCH":
                return {
                    ...state,
                    search_results: [...action.payload],
                };
            
            case "CANCEL_BOOKING":
                function getBookingIndex() {
                    for (let index in state.bookings) {
                        if (state.bookings[index].id === action.payload){
                            return index
                        };
                    };
                };

                const new_bookings = [...state.bookings];
                new_bookings.splice(getBookingIndex(), 1)
            
                return {
                    ...state,
                    bookings: new_bookings,
                };
            
            default:
                return state;
            };
        };
        
import axiosInstance from "../../axiosInstance";

import messagesAction from "./messagesAction";

export const fetchShops = () => (dispatch, getState) => {
    axiosInstance
    .get("/stores/")
    .then(response => {
        dispatch({ type: "GET_SHOPS", payload: response.data })
    });
};

export function fetchShop(id) {
    return function(dispatch, getState) {
        axiosInstance
        .get(`/stores/${id}`)
        .then(response => {
            dispatch({ type: "GET_SHOP", payload: response.data })
        });
    };
};

export function fetchShopComments(id) {
    return function(dispatch) {
        axiosInstance
        .get(`/stores/comments/?commented_store=${id}`)
        .then(response => {
            dispatch({ type: "GET_COMMENTS", payload: response.data })
        });
    };
};

export function addShopComment(comment) {
    return function(dispatch) {
        axiosInstance
        .post("/stores/comments/", comment)
        .then(response => console.log(response))
    }
};

export const fetchFavouriteShops = () => (dispatch, getState) => {
    axiosInstance
    .get("/stores/favourites/")
    .then(response => {
        dispatch({ type: "GET_FAV", payload: response.data })
    });
};

export function addFavouriteShop(id) {
    return function(dispatch, getState) {
        axiosInstance
        .post("/stores/favourites/", {
            "store": id,
        })
        .then(response => {
            dispatch({ type: "ADD_FAV", payload: response.data })
        })
        .catch(error => console.log(error));
    };
};

export function removeFavouriteShop(id) {
    return function (dispatch, getState) {
        const all_favourites = getState().shops.favourites;
        for (let index in all_favourites) {
            const fav_store_id = parseInt(all_favourites[index].store.id);
            if (fav_store_id === id) {
                const fav_object_id = parseInt(all_favourites[index].id);

                axiosInstance
                .delete(`/stores/favourites/${fav_object_id}`)
                .then(response => {
                    dispatch({ type: "REMOVE_FAV", payload: fav_object_id });
                })
                .catch(error => console.log(error));
            };
        };
    };
};

export function fetchUserBookings() {
    return function(dispatch) {
        axiosInstance
        .get("stores/bookings/")
        .then(response => {
            dispatch({ type: "GET_USER_BOOKINGS", payload: response.data });
        })
        .catch(error => console.log(error));
    };
};

export function fetchBookings(id) {
    return function(dispatch) {
        axiosInstance
        .get(`stores/bookings/?store__id=${id}`)
        .then(response => {
            console.log(response);
            dispatch({ type: "GET_BOOKINGS", payload: response.data })
        })
        .catch(error => console.log(error));
    };
};

export function createBooking(book) {
    return function(dispatch) {
        axiosInstance
        .post("/stores/bookings/", book)
        .then(response => {
            dispatch(messagesAction(["success", ["Booking created sccuessfully!"]]));
            console.log(response);
        })
        .catch(error => {
            console.log(error.response.data)
        });
    };
};

export function createShop(shop) {
    return function(dispatch) {
        axiosInstance
        .post("/stores/", shop)
        .then(response => {
            console.log(response);
            dispatch({ type: "CREATE_SHOP", payload: response.data });
        })
        .catch(error => console.log(error.response));
    };
};

// export function getOwnedShop() {
//     return function(dispatch) {
//         axiosInstance
//         .get(``)
//     };
// };

export function searchShop(query) {
    return function(dispatch) {
        axiosInstance
        .get(`/stores/?search=${query}`)
        .then(response => {
            dispatch({ type: "SEARCH", payload: response.data });
        })
        .catch(error => console.log(error));
    };
};

export function fetchPosts(id) {
    return function(dispatch) {
        axiosInstance
        .get(`/stores/posts/?store=${id}`)
        .then(response => {
            console.log(response);
            dispatch({ type: "GET_POSTS", payload: response.data });
        })
        .catch(error => console.log(error));
    };
};

export function deleteBooking(id) {
    return function(dispatch) {
        axiosInstance
        .delete(`/stores/bookings/${id}/`)
        .then(response => {
            console.log(response);
            dispatch({ type: "CANCEL_BOOKING", payload: id });
        })
        .catch(error => console.log(error));
    };
};

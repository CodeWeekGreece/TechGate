export default function addMessage(message) {
    return function(dispatch) {
        dispatch({ type: "ADD_MESSAGE", payload: message })
    };
};

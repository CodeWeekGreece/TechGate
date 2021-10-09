export default function messagesReducer(state = { messages: [] }, action) {
    switch(action.type) {
        case "ADD_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };

        default:
            return state;
    };
};

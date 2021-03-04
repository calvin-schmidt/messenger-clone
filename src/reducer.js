export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ACTIVE_CHAT: "SET_ACTIVE_CHAT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.activeChat,
      };
    default:
      return state;
  }
};

export default reducer;

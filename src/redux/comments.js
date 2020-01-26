import * as ActionTypes from "./ActionTypes";

//REDUCER FUNCTION TO HANDLE THIS PART OF STATE
//will updtate part of state when add comment action
//is dispatched to the store

export const Comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_COMMENT:
      const comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };
    default:
      return state;
  }
};

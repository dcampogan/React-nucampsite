import * as ActionTypes from './ActionTypes';

//REDUCER FUNCTION TO HANDLE THIS PART OF STATE
//will updtate part of state when partners action
//is dispatched to the store

export const Partners = (state = {
  isLoading: true,
  errMess: null,
  partners: []
}, action) => {
switch (action.type) {
  case ActionTypes.ADD_PARTNERS:
      return {...state, isLoading: false, errMess: null, partners: action.payload};
  case ActionTypes.PARTNERS_LOADING:
      return {...state, isLoading: true, errMess: null, partners: []};
  case ActionTypes.PARTNERS_FAILED:
      return {...state, isLoading: false, errMess: action.payload};
  default:
      return state;
}
};
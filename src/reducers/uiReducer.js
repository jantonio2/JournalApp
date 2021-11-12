import { types } from '../types/types';

const initialstate = {
  loading: false,
  msgError: null
};

export const uiReducer = (state = initialstate, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload
      };
    case types.uiRemoveError:
      return {
        ...state,
        msgError: null
      };
  
    default:
      return state;
  }
};
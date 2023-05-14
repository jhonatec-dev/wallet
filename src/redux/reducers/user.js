// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ACTIONS } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.userLogin:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default user;

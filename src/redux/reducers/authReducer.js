
import { LOGIN, REGISTER, LOGOUT } from "../constants/authConstants";

export const loginReducer = ( state= {}, action ) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.payload.uid,
        name: action.payload.name
      };

    case LOGOUT:
      
      return {};

    default:
      return state;
  }
};

export const registerReducer = ( state = {}, action) => {
  switch (action.type) {
    case REGISTER:
      
      return {}
  
    default:
      return state;
  }
}
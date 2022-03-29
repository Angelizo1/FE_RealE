

import { LOGIN, REGISTER, LOGOUT } from "../constants/authConstants";


export const startLoginEmailPassword = (email, password) => {
  return(dispatch) => {
    
    try {
      
      // TODO: MAKE CALL TO BE service 

      dispatch({ type: LOGIN, payload: pay })

    } catch (error) {
      console.log(error);
    }
  }
}

export const startLogout = () => {
  return async(dispatch) => {

    // TODO: Make a call to BE 

    // Update state, clear credentials

    dispatch({ type: LOGOUT })

  }
}

export const startRegister = (name, email, password) => {
  return(dispatch) => {
    
    try {
      
      // TODO: MAKE CALL TO BE service 


      dispatch({ type: REGISTER, payload: pay })

    } catch (error) {
      console.log(error);
    }
  }
}


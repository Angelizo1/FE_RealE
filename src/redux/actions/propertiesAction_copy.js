import {
  GET_PROPERTIES,
  GET_FEATURED_PROPERTIES,
  GET_STRUCTURED_DATA,
  GET_PROPERTY,
} from "../constants/propertyConstants";
import properties from "../../dev-data/listing";
import { common_listing_data } from "../../dev-data/listing_common";

export const getStructureData = () => {
  return async(dispatch) => {
    try {
      
      // TODO: call for structure data

      
      dispatch({type: GET_STRUCTURED_DATA, payload: common_listing_data})

    } catch (error) {
      console.warn(error);
    }

  }
}

export const getPropertyList = ({data = null} = {}) => {
  return async(dispatch) => {
    try {

      // TODO: make call for BE

      let pay = (data === null) ? properties : data;
      dispatch({ type: GET_PROPERTIES, payload: pay });
      
    } catch (error) {
      console.log(error);
    }
  }
} 

export const getFeaturedList = () => {
  return async(dispatch) => {
    try {
      
      // TODO: call featured properties 


      const featured = properties
        .filter((property) => property.featured === true)
        .slice(0, 6);
        
        dispatch({ type: GET_FEATURED_PROPERTIES, payload: featured });
      
    } catch (error) {
      console.log(error);
    }
  }
}

export const getProperty = (id) => {
  return async(dispatch) => {
   
    try {
      // TODO: make call for single property
      
      
      const property = properties.find((property) => property.id === +id);
      
      dispatch({ type: GET_PROPERTY, payload: property });
      
    } catch (error) {
      console.log(error);
    }
  }
}
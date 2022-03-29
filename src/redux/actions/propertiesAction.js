import {
  GET_PROPERTIES,
  GET_SORTED_PROPERTIES,
  GET_FEATURED_PROPERTIES,
  GET_STRUCTURED_DATA,
  GET_PROPERTY,
} from "../constants/propertyConstants";
import properties from "../../dev-data/listing";
import { common_listing_data } from "../../dev-data/listing_common";

export const getStructureData = () => async(dispatch) => {
  dispatch({type: GET_STRUCTURED_DATA, payload: common_listing_data})
}

export const getPropertyList = ({data = null} = {}) => async (dispatch) => {
  let pay = (data === null) ? properties : data;
  dispatch({ type: GET_PROPERTIES, payload: pay });
};

export const getFeaturedList = () => async (dispatch) => {
  const featured = properties
    .filter((property) => property.featured === true)
    .slice(0, 6);
  dispatch({ type: GET_FEATURED_PROPERTIES, payload: featured });
};

export const getProperty = (id) => async (dispatch) => {
  const property = properties.find((property) => property.id === +id);
  dispatch({ type: GET_PROPERTY, payload: property });
};

import {
  GET_PROPERTIES,
  GET_FEATURED_PROPERTIES,
  GET_PROPERTY,
  GET_STRUCTURED_DATA,
  GET_SORTED_PROPERTIES
} from "../constants/propertyConstants";

export const propertyListReducer = (state = { properties: [] }, action) => {
  switch (action.type) {
    case GET_PROPERTIES:
      return { properties: action.payload };
    default:
      return state;
  }
};

export const structureDataReducer = (state={ structureData:[]}, action) => {
  switch (action.type) {
    case GET_STRUCTURED_DATA:
      return { structureData: action.payload }
    default:
      return state;
  }
}

export const featuredPropertyReducer = (state = { featured: [] }, action) => {
  switch (action.type) {
    case GET_FEATURED_PROPERTIES:
      return { featured: action.payload };
    default:
      return state;
  }
};

export const propertyReducer = (
  state = {
    property: {
      images: [],
      features: {},
      amenities: [],
      address: {},
      agent: {},
    },
  },
  action
) => {
  switch (action.type) {
    case GET_PROPERTY:
      return { ...state, property: action.payload };
    default:
      return state;
  }
};

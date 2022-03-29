import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

import {
  propertyListReducer,
  featuredPropertyReducer,
  propertyReducer,
  structureDataReducer,
} from "./reducers/propertiesReducer";

import {
  featuredAgentsReducer,
  agentListReducer,
  agentReducer,
} from "./reducers/agentsReducer";
import { messagesReducer } from "./reducers/messagesReducer";
import { loginReducer } from "./reducers/authReducer";

const middlewares = [thunk];

const reducer = combineReducers({
  propertyList: propertyListReducer,
  featuredProperty: featuredPropertyReducer,
  featuredAgents: featuredAgentsReducer,
  agentList: agentListReducer,
  agent: agentReducer,
  property: propertyReducer,
  messageList: messagesReducer,
  propertyStructureData: structureDataReducer,
  authReducer: loginReducer,
});
const intialState = {};

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

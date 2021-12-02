import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import masterReducer from "./master-reducer";
import farmingReducer from "./farming-reducer";

export const rootReducer = combineReducers({
  //add MODULE vise reducers
  masterReducer,
  farmingReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const ReduxProvider = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

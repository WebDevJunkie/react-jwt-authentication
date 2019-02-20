import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducers';

const rootReducer = combineReducers({
  authentication,
  users,
  alert
});

export default rootReducer;

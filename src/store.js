import { createStore, combineReducers } from 'redux';
import editReducer from './reducers/editReducer';
import selectReducer from './reducers/selectReducer';
import adminReducer from './reducers/adminReducer'

const reducers = combineReducers({
	banner: editReducer,
	select: selectReducer,
	admin: adminReducer
});

const store = createStore(reducers);

export default store;

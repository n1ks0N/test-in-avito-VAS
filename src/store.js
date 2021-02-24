import { createStore, combineReducers } from 'redux';
import editReducer from './reducers/editReducer';
import selectReducer from './reducers/selectReducer';

const reducers = combineReducers({
	banner: editReducer,
	select: selectReducer
});

const store = createStore(reducers);

export default store;

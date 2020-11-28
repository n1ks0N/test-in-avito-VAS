import { createStore, combineReducers } from 'redux'
import editReducer from './reducers/editReducer'

const reducers = combineReducers({
    banner: editReducer
})

const store = createStore(reducers)
export default store


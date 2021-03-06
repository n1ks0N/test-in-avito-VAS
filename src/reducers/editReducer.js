import reset from '../constants/reset';

const initialState = reset;

const editReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'EDIT-SELECT':
			return { ...state, width: action.width, height: action.height };
		case 'EDIT-CHANGE':
			state.properties[action.index][action.name] = action.param;
			return state;
		case 'EDIT-TIME':
			return { ...state, time: action.time };
		default:
			return state;
	}
};

export const changeActionCreater = (width, height) => ({
	type: 'EDIT-SELECT',
	width: width,
	height: height
});
export const alterActionCreater = (param, name, index) => ({
	type: 'EDIT-CHANGE',
	param: param,
	name: name,
	index: index
});
export const timeActionCreater = (time) => ({ type: 'EDIT-TIME', time: time });

export default editReducer;

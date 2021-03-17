import reset from '../constants/reset';

const initialState = reset;

const editReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'EDIT-SELECT':
			return { ...state, width: action.width, height: action.height };
		case 'EDIT-CHANGE':
			state.properties[action.index][action.name] = action.param;
			return state;
		case 'EDIT-MAIN':
			if (action.name === 'count') {
				const newProperties = state.properties.splice(0, action.param);
				return { ...state, properties: newProperties, count: action.param };
			} else {
				return { ...state, [action.name]: action.param };
			}
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
export const timeActionCreater = (param, name) => ({
	type: 'EDIT-MAIN',
	param: param,
	name: name
});

export default editReducer;

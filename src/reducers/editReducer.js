import reset from '../constants/reset';

const initialState = JSON.parse(JSON.stringify(reset));

const editReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'EDIT-SELECT':
			return { ...state, width: action.width, height: action.height };
		case 'EDIT-CHANGE':
			state.properties[action.index][action.name] = action.param;
			return state;
		case 'EDIT-MAIN':
			if (action.name === 'count') {
				let newProperties = reset.properties.slice();
				return {
					...state,
					properties: newProperties.splice(0, action.param),
					count: action.param
				};
			} else {
				return { ...state, [action.name]: action.param };
			}
		default:
			return state;
	}
};

export const changeActionCreator = (width, height) => ({
	type: 'EDIT-SELECT',
	width: width,
	height: height
});
export const alterActionCreator = (param, name, index) => ({
	type: 'EDIT-CHANGE',
	param: param,
	name: name,
	index: index
});
export const mainChangeActionCreator = (param, name) => ({
	type: 'EDIT-MAIN',
	param: param,
	name: name
});

export default editReducer;

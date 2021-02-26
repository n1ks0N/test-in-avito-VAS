import reset from '../constants/reset';

const initialState = reset;

const editReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'EDIT-SELECT':
			return { ...state, width: action.width, height: action.height };
		case 'EDIT-CHANGE':
			state[action.name] = action.param;
			console.log(state.image, action.param);
			return state;
		case 'EDIT-RESET':
			return reset;
		default:
			return state;
	}
};

export const changeActionCreater = (width, height) => ({
	type: 'EDIT-SELECT',
	width: width,
	height: height
});
export const alterActionCreater = (param, name) => ({
	type: 'EDIT-CHANGE',
	param: param,
	name: name
});
export const resetActionCreater = () => ({ type: 'EDIT-RESET' });

export default editReducer;

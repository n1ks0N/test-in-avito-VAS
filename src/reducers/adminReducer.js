const initialState = { record: [], metadata: [] };

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET-ADMIN':
      return {
        record: action.record,
        metadata: action.metadata
      }
    case 'EDIT-ADMIN':
      return {};
    default:
      return state;
  }
};

export const getAdminActionCreator = (data) => ({ type: 'GET-ADMIN', data: data });

export default adminReducer;

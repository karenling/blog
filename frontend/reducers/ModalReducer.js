const initialState = {
  contactModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_CONTACT_MODAL':
      return { ...state, contactModal: !state.contactModal };
    default:
      return state;
  }
};

const ticketListReducer = (state = {}, action) => {
  const { names, location, issue, id } = action; //obj destructuring const { ticket } = props; mitaina
  switch (action.type) {
    case 'ADD_TICKET':
      //clone the state obj takes 3 args
      return Object.assign({}, state, { 
        [id]: {
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
    case 'DELETE_TICKET':
      const newState = { ...state };
      delete newState[id];
      return newState;
  default:
    return state;
  }
};

export default ticketListReducer
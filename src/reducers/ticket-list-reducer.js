import * as c from './../actions/ActionTypes';

const ticketListReducer = (state = {}, action) => {
  const { id, formattedWaitTime } = action; //obj destructuring const { ticket } = props; mitaina
  switch (action.type) {
    
    case c.DELETE_TICKET:
      const newState = { ...state };//
      delete newState[id];
      return newState;
    
    case c.UPDATE_TIME:
      const newTicket = Object.assign({}, state[id], {formattedWaitTime});
      const updatedState = Object.assign({}, state, {
        [id]: newTicket
      });
      return updatedState;
  

  default:
    return state;
  }
};

export default ticketListReducer

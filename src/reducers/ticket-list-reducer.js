import * as c from './../actions/ActionTypes';

const ticketListReducer = (state = {}, action) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = action; //obj destructuring const { ticket } = props; mitaina
  switch (action.type) {
    case c.ADD_TICKET:
      //clone the state obj takes 3 args
      return Object.assign({}, state, {  //<- This is the new masterTicketList we want to send to TicketControl
        [id]: {
          names: names,
          location: location,
          issue: issue,
          id: id,
          timeOpen: timeOpen,
          formattedWaitTime: formattedWaitTime
        }
      });
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

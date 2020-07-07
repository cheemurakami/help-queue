import React from "react";
import Ticket from "./Ticket";
//import { v4 } from 'uuid';
import PropTypes from "prop-types";


function TicketList(props){
  return (
    <React.Fragment>
      <hr/> 
      {/* {
        let ticketListArray = Object.values(props.ticketList)
      for(let i=0; i < ticketListArray.length; i++){
        let ticket = ticketListArray[i]
        let whenTicketClicked = props.onTicketSelection
        return <Ticket
        whenTicketClicked = { props.onTicketSelection }
        names={ticket.names}
        location={ticket.location}
        issue={ticket.issue}
        id={ticket.id}
        key={ticket.id}/>
      }} */}
      
      {Object.values(props.ticketList).map((ticket) => {
        return <Ticket
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}/>
        }
      )}
    </React.Fragment>
  );
}
TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};
export default TicketList;
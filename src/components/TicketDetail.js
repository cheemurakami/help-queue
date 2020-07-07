import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props){
  const { ticket, onClickingDelete } = props; //prop name from TicketControll

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em>
      <br />
      <button onClick={ props.onClickingEdit }>Update Ticket</button>
      <button onClick={()=> onClickingDelete(ticket.id) }>Close Ticket</button></p>
      <hr/>
    </React.Fragment>
  );
}
TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};
export default TicketDetail;
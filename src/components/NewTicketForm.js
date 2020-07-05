import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewTicketForm(props){
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: v4()});
    // console.log(event.target.names.value);
    // console.log(event.target.location.value);
    // console.log(event.target.issue.value);
  }
  return (
    <React.Fragment>
      {/* <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          name='names'
          placeholder='Pair Names' />
          <br />
        <input
          type='text'
          name='location'
          placeholder='Location' />
        <br />
        <textarea
          name='issue'
          placeholder='Describe your issue.' />
        <button type='submit'>Help!</button>
      </form> */}
    <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}
NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};
export default NewTicketForm;
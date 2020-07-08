import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import { connect } from 'react-redux';
import EditTicketForm from './EditTicketForm';
import PropTypes from "prop-types";
import * as a from './../actions';


class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
    this.handleClick = this.handleClick.bind(this); 
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
      const { dispatch } = this.props;
      // const action = {
      //   type: 'TOGGLE_FORM'
      // }
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    // const action = {
    //   type: 'ADD_TICKET',
    //   id: id,
    //   names: names,
    //   location: location,
    //   issue: issue,
    // }
    const action = a.addTicket(newTicket);
    dispatch(action);
    // this.setState({formVisibleOnPage: false});
    // const action2 = {
    //   type: 'TOGGLE_FORM'
    // }
    const action2 = a.toggleForm();
    dispatch(action2);
  } //[]updating with a new ticket

  //selected ticket
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    // const action = {
    //   type: 'DELETE_TICKET',
    //   id: id
    // }
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    // const action = {
    //   type: 'ADD_TICKET',
    //   id: id,
    //   names: names,
    //   location: location,
    //   issue: issue,
    // }
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    }
    else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick}/>
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    }
    else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List"; 
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>; //prop ni assign shita
      buttonText = "Add Ticket";     

    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> { /* new code */ }
      </React.Fragment>
    );
  } 
}

const mapStateToProps = state => {
  console.log(state);
  console.log(state.masterTicketList)
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}
TicketControl = connect(mapStateToProps)(TicketControl);

TicketControl.propTypes = {
  masterTicketList: PropTypes.object
};
export default TicketControl;

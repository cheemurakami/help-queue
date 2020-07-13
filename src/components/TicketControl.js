import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import { connect } from "react-redux";
import EditTicketForm from "./EditTicketForm";
import PropTypes from "prop-types";
import * as a from "./../actions";
import { withFirestore } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(
      () => this.updateTicketElapsedWaitTime(),
      10000
    );
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount() {
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const now = this.props.firestore.FieldValue.serverTimestamp();
    ;
    console.log("NOW " + now)
    this.props.firestore
      .get({ collection: "tickets" })
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log("TIME OPEN " + doc.data().timeOpen);
          console.log("UPDATED TIME " + (doc.data().timeOpen.fromDate(now)));
          // this.props.firestore.update({collection: 'tickets', doc: doc.id}, {formattedTime: now() - doc.timeOpen})
        });
      });
  };

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false,
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  };

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  };

  //selected ticket
  handleChangingSelectedTicket = (id) => {
    this.props.firestore
      .get({ collection: "tickets", doc: id })
      .then((ticket) => {
        const firestoreTicket = {
          names: ticket.get("names"),
          location: ticket.get("location"),
          issue: ticket.get("issue"),
          id: ticket.id,
        };
        this.setState({ selectedTicket: firestoreTicket });
      });
  };

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({ collection: "tickets", doc: id });
    this.setState({ selectedTicket: null });
  };

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  };

  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = (
        <EditTicketForm
          ticket={this.state.selectedTicket}
          onEditTicket={this.handleEditingTicketInList}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      );
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = (
        <TicketList onTicketSelection={this.handleChangingSelectedTicket} />
      ); //prop ni assign shita
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>{" "}
        {/* new code */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formVisibleOnPage: state.formVisibleOnPage,
  };
};
TicketControl = connect(mapStateToProps)(TicketControl);

export default withFirestore(TicketControl);

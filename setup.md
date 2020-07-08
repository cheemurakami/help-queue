#### Add Redux and React Redux bindings

`npm install redux@4.0.5 react-redux@7.1.3`


#### 1. In index.js import these
```
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/ticket-list-reducer';
```
#### 2. To make a store, add this and console log if store.getState() is working 
```
const store = createStore(reducer);
store.subscribe(() =>
  console.log(store.getState())
);
```

#### 3. Wrap App with Provider
```
  <Provider store={store}>
    <App />
  </Provider>,
```
#### 4. Connect Components to Store in `src/components/TicketControl.js`
```
import { connect } from 'react-redux';

...
//最後に

TicketControl = connect()(TicketControl);

export default TicketControl;
```

#### 5. Write tests in  `src/__tests__/ticket-list-reducer.test.js`, Note that `expect(ticketListReducer({}, { type: null })).toEqual({});` ticketListReducer takes 2 arguments, 1) current state, 2) action that will be applied to the current state.
```
import ticketListReducer from '../../reducers/ticket-list-reducer';

describe('ticketListReducer', () => {

  let action;

  const currentState = {
    1: {names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    id: 1 },
    2: {names: 'Jasmine and Justine',
    location: '2a',
    issue: 'Reducer has side effects.',
    id: 2 }
  }

  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    id: 1
  };

  test('Should return default state if no action type is recognized', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new ticket data to masterTicketList', () => {
    const { names, location, issue, id } = ticketData;
    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      id: id
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_TICKET',
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2 }
    });
  });

});
```

#### 6. Write Reducers for testing in `src/reducers/ticket-list-reducer.js`
```
export default (state = {}, action) => {
  //state = {}  初期値, action  viewから来た
  const { names, location, issue, id } = action;
  switch (action.type) {
  case 'ADD_TICKET':
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
```

#### 7. In `TicketControl.js` can dispatch action and write! (type: 'ADD_TICKET')
```
handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }
```
#### 8. In `TicketControl.js` use mapStateToProps to use the state we created in reducer, give it a name so we can use it in render!
```
const mapStateToProps = state => {
  return {
    masterTicketList: state
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);
```
//Reducerから来たobjにmasterTicketListと名前をつけてあげる
```
TicketControl.propTypes = {
  masterTicketList: PropTypes.object
};
```

#### 9. In render, can use `this.props,masterTicketList`
```
currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
```
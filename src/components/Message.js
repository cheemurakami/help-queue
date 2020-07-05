import React from 'react'

function Message(props) {
  function pickMessage (){
    if (props.counter === 1){
      return "Have you gone through all the steps on the Learn How to Program debugging lesson?"
    }
  }
  return (
    <React.Fragment>
      {pickMessage()}
    </React.Fragment>
  )
}

export default Message;
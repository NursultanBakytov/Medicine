import React from 'react'
import { v1 as uuid } from 'uuid'

const CreateRoom = (props) => {
  const async = () => {
    setTimeout(create, 10000)
  }

  function create() {
    const id = uuid()
    props.history.push(`/room/${id}`)
  }
  const test = () => {
    console.log('%test', 'color: red;font-weight:bold:font-size:30px')
  }
  return (
    <div>
      <button onClick={async}>Create room</button>
      <button onClick={test}>Create room</button>
    </div>
  )
}

export default CreateRoom

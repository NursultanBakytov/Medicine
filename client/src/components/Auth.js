import React, { useEffect, useState } from 'react'
import fire from './firebase.js'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    })
  }, [])

  if (pending) {
    return (
      <div className="container">
        <br /> <br />
        <br />
        <br />
        <br />
        <br />
        <br /> <br />
        <br /> <br />
        <div className="row">
          <div className="col-md-12">
            <div className="loader11">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

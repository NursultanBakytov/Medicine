import React, { useCallback, useContext } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext } from './Auth.js'
import fire from './firebase.js'
import M from 'materialize-css'

const SignUp = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await fire
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        M.toast({
          html: 'Вы неправильно ввели свои данные',
          classes: 'rounded',
        })
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <form method="POST" class="col s12 form" onSubmit={handleLogin}>
        <h3 class="text-center">Зарегистрироваться как пациент</h3>

        <label>
          Email
          <input name="email" type="email" placeholder="Введите Email" />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Введите Password"
          />
        </label>
        <div class="row buttons">
          <div class="col s7 ">
            <button
              class="btn  waves-effect waves-light"
              type="submit"
              name="action"
            >
              Зарегистрироваться
            </button>
          </div>
          <div class="col s5">
            <Link class="btn signupLogin waves-effect waves-light" to="/login">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp

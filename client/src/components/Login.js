import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import fire from './firebase'
import firebase from 'firebase'
import M from 'materialize-css'
import anon from '../assets/anon.png'
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const Login = ({ history }) => {
  // ----------- Start EmailLogin -----------
  const EmailLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await fire
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
        var user = fire.auth().currentUser
        user
          .sendEmailVerification()
          .then(function () {
            M.toast({ html: 'Ссылка отправлена!', classes: 'rounded' })
          })
          .catch(function (error) {
            M.toast({ html: 'Что-то пошло не так!', classes: 'rounded' })
          })
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
  // -----------  End EmailLogin  -----------
  // ----------- Start PhoneLogin -----------
  var uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: async (authResult) => {
        const userInfo = authResult.additionalUserInfo
        if (userInfo.isNewUser && userInfo.providerId === 'password') {
          try {
            var user = fire.auth().currentUser
            user
              .sendEmailVerification()
              .then(function () {
                M.toast({ html: 'Ссылка отправлена!', classes: 'rounded' })
              })
              .catch(function (error) {
                M.toast({ html: 'Что-то пошло не так!', classes: 'rounded' })
              })
          } catch (error) {
            M.toast({
              html: 'Вы неправильно ввели свои данные',
              classes: 'rounded',
            })
          }
        }
        return false
      },
    },
  }

  // ----------- End PhoneLogin sign up -----------

  // ----------- Start anonymous login -----------
  const anonLogin = useCallback(
    async (event) => {
      event.preventDefault()

      try {
        await fire
          .auth()
          .signInAnonymously()
          .then(() => {
            M.toast({ html: 'Добро пожаловать!', classes: 'rounded' })
          })
          .catch((error) => {
            M.toast({ html: 'Что-то пошло не так!', classes: 'rounded' })
          })
        history.push('/')
      } catch (error) {
        M.toast({ html: 'Вы не правильно ввели данные', classes: 'rounded' })
      }
    },
    [history]
  )
  // ----------- End anonymous login -----------
  // Всплывающиеся окно
  M.AutoInit()
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped')
    var instances = M.Tooltip.init(elems)
  })
  // ----------- Start HTML  -----------

  return (
    <div>
      <form class="col s12 form" onSubmit={EmailLogin}>
        <h3>Вход для пациентов</h3>

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
          <div class="col s5 ">
            <button
              class="btn  waves-effect waves-light"
              type="submit"
              name="action"
            >
              Войти
            </button>
          </div>
          <div class="col s7">
            <Link class="btn signin waves-effect waves-light" to="/signup">
              Зарегистрироваться
            </Link>
          </div>
        </div>
        <div class="hr">OR</div>

        <Link
          class="doctorSignup waves-effect waves-teal btn-flat tooltipped"
          to="/docLogin"
          data-tooltip="Войти как доктор"
        >
          Я доктор
        </Link>
        <StyleFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />

        <button
          class="btn_anon tooltipped"
          data-tooltip="Войти анонимно"
          onClick={anonLogin}
        >
          <img alt="sign in anonimous " src={anon} class="social_icon" />
        </button>
      </form>
    </div>
  )
}

export default Login
// ----------- End Login -----------

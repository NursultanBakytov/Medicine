import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import fire from './firebase'
import firebase from 'firebase'
import M from 'materialize-css'
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const DocLogin = ({ history }) => {
  // ----------- Start EmailsignUp -----------
  const EmailsignUp = useCallback(
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
            M.toast({ html: 'Ссылка отправлена', classes: 'rounded' })
          })
          .catch(function (error) {
            M.toast({ html: 'Что-то пошло не так!', classes: 'rounded' })
          })
        history.push('/docPage')
      } catch (error) {
        M.toast({ html: 'Вы не правильно ввели данные', classes: 'rounded' })
      }
    },
    [history]
  )
  // ----------- End EmailsignUp sign up -----------
  // ----------- Start PhoneSignUp -----------
  var uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/docPage',
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
                M.toast({ html: 'Добро пожаловать!!', classes: 'rounded' })
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
  // ----------- End anonymous sign up -----------
  // Всплывающиеся окно
  M.AutoInit()
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped')
    var instances = M.Tooltip.init(elems)
  })
  // ----------- Start HTML  -----------
  return (
    <div>
      <form class="col s12 form" onSubmit={EmailsignUp}>
        <h3>Войти как Доктор</h3>

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
            <Link class="btn signin waves-effect waves-light" to="/docSignup">
              Зарегистрироваться
            </Link>
          </div>
        </div>
        <div class="hr">OR</div>
        <Link
          class="doctorSignup waves-effect waves-teal btn-flat tooltipped"
          data-tooltip="Войти как пациент"
          to="/login"
        >
          Я пациент
        </Link>
        <StyleFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
      </form>
    </div>
  )
}

export default DocLogin

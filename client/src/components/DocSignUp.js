import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext } from './Auth.js'
import fire from './firebase.js'
import M from 'materialize-css'

const DocSignUp = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await fire
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        history.push('/docPage')
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
    return <Redirect to="/docPage" />
  }

  return (
    <div>
      <form class="col s12 form" onSubmit={handleLogin}>
        <h3 class="text-center">Зарегистрироваться как доктор</h3>

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
          <div class="col s9 ">
            <button
              class="btn  waves-effect waves-light"
              type="submit"
              name="action"
            >
              Зарегистрироваться
            </button>
          </div>
          <div class="col s3">
            <Link class="btn firstBtn waves-effect waves-light" to="/docLogin">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DocSignUp

// import React, { useCallback } from 'react'
// import { withRouter } from 'react-router'
// import { Link } from 'react-router-dom'
// import fire from './firebase'
// import firebase from 'firebase'
// import M from 'materialize-css'
// import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// const DocSignUp = ({ history }) => {
//   // ----------- Start EmailsignUp -----------
//   const EmailsignUp = useCallback(
//     async (event) => {
//       event.preventDefault()
//       const { email, password } = event.target.elements
//       try {
//         await fire
//           .auth()
//           .createUserWithEmailAndPassword(email.value, password.value)
//         var user = fire.auth().currentUser
//         user
//           .sendEmailVerification()
//           .then(function () {
//             M.toast({ html: 'Ссылка отправлена', classes: 'rounded' })
//           })
//           .catch(function (error) {
//             M.toast({ html: 'Что-то пошло не так!', classes: 'rounded' })
//           })
//         history.push('/docPage')
//       } catch (error) {
//         M.toast({ html: 'Вы не правильно ввели данные', classes: 'rounded' })
//       }
//     },
//     [history]
//   )
//   // ----------- End EmailsignUp sign up -----------
//   // ----------- Start PhoneSignUp -----------
//   var uiConfig = {
//     signInFlow: 'popup',
//     signInSuccessUrl: '/docPage',
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//     ],
//     callbacks: {
//       signInSuccessWithAuthResult: async (authResult) => {
//         const userInfo = authResult.additionalUserInfo
//         if (userInfo.isNewUser && userInfo.providerId === 'password') {
//           try {
//             var user = fire.auth().currentUser
//             user
//               .sendEmailVerification()
//               .then(function () {
//                 M.toast({ html: 'Добро пожаловать!!', classes: 'rounded' })
//               })
//               .catch(function (error) {
//                 M.toast({ html: 'Что-то пошло не так!', classes: 'rounded' })
//               })
//           } catch (error) {
//             M.toast({
//               html: 'Вы неправильно ввели свои данные',
//               classes: 'rounded',
//             })
//           }
//         }
//         return false
//       },
//     },
//   }
//   // ----------- End anonymous sign up -----------
//   // Всплывающиеся окно
//   M.AutoInit()
//   document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.tooltipped')
//     var instances = M.Tooltip.init(elems)
//   })
//   // ----------- Start HTML  -----------
//   return (
//     <div>
//       <form class="col s12 form" onSubmit={EmailsignUp}>
//         <h3>Регистрация Доктора</h3>

//         <label>
//           Email
//           <input name="email" type="email" placeholder="Введите Email" />
//         </label>
//         <label>
//           Password
//           <input
//             name="password"
//             type="password"
//             placeholder="Введите Password"
//           />
//         </label>
//         <div class="row buttons">
//           <div class="col s7 ">
//             <button
//               class="btn  waves-effect waves-light"
//               type="submit"
//               name="action"
//             >
//               Зарегистрироваться
//             </button>
//           </div>
//           <div class="col s5">
//             <Link class="btn signin waves-effect waves-light" to="/docLogin">
//               Войти
//             </Link>
//           </div>
//         </div>
//         <div class="hr">OR</div>
//         <Link
//           class="doctorSignup waves-effect waves-teal btn-flat tooltipped"
//           data-tooltip="Войти как пациент"
//           to="/login"
//         >
//           Я пациент
//         </Link>
//         <StyleFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
//       </form>
//     </div>
//   )
// }

// export default withRouter(DocSignUp)

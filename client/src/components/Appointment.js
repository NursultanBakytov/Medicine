import React, { Component } from 'react'
import M from 'materialize-css'
import db from './firebase'
import { Link } from 'react-router-dom'
import Calendar from './Calendar'

export default class Appointment extends Component {
  render() {
    const MakeAppointment = async (e) => {
      e.preventDefault()
      const calendar = document.getElementById('calendarr').value
      if (!calendar) {
        return alert('Заполните все поля!')
      }
      await db
        .collection('calendar')
        .add({
          date_appointment: calendar,
          costumer: 'costumer',
          amount: 'amount',
        })
        .then(
          (result) => {
            M.toast({
              html: 'Вы успешно добваились!',
              classNamees: 'rounded',
            })
          },
          (error) => {
            alert(error.text)
          }
        )
    }
    return (
      <div className="container">
        <input
          type="date"
          id="calendarr"
          className="calendarr"
          // value="2021-03-30"
        />
        <button className="btn  green " onClick={MakeAppointment}>
          Записаться
        </button>
        <Link className="btn  green " to="/">
          На главную страницу
        </Link>
        <Calendar />
      </div>
    )
  }
}

// import React from 'react'
// import M from 'materialize-css'
// import db from './firebase'
// import { Link } from 'react-router-dom'
// import Calendar from './Calendar'

// const Appointment = () => {
// const MakeAppointment = async (e) => {
//   e.preventDefault()
//   const calendar = document.getElementById('calendarr').value
//   if (!calendar) {
//     return alert('Заполните все поля!')
//   }
//   await db
//     .collection('calendar')
//     .add({
//       date_appointment: calendar,
//       costumer: 'costumer',
//       amount: 'amount',
//     })
//     .then(
//       (result) => {
//         M.toast({
//           html: 'Вы успешно добваились!',
//           classNamees: 'rounded',
//         })
//       },
//       (error) => {
//         alert(error.text)
//       }
//     )
// }
//   return (
// <div className="container">
//   <input
//     type="date"
//     id="calendarr"
//     className="calendarr"
//     // value="2021-03-30"
//   />
//   <button className="btn  green " onClick={MakeAppointment}>
//     Записаться
//   </button>
//   <Link className="btn  green " to="/">
//     На главную страницу
//   </Link>
//   <Calendar />
// </div>
//   )
// }

// export default Appointment

import VideoPlayer from 'react-video-js-player'
import React, { useEffect, useRef, useState } from 'react'
import fire, { db } from './firebase'
import mountain from '../assets/test.jpg'
import 'moment/locale/ru'
import moment from 'moment'
// import FullCalendar from '@fullcalendar/react'
// import daygridPlugin from '@fullcalendar/daygrid'
import M from 'materialize-css'
import { Link } from 'react-router-dom'
// import Calendar from './Calendar'

const Home = () => {
  const [userTime, setUserTime] = useState([])
  useEffect(() => {
    db.collection('user').onSnapshot((snapshot) => {
      setUserTime(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])
  // --------- timer ---------
  // const [timerDays, setTimerDays] = useState('00')
  // const [timerHours, setTimerHours] = useState('00')
  // const [timerMinutes, setTimerMinutes] = useState('00')
  // const [timerSeconds, setTimerSeconds] = useState('00')
  // let interval = useRef()
  // const date = `${userTime.map((time, key) => {
  //   return (
  //     <div key={key}>
  //       {/* <span>{time.Mondate}</span> */}
  //       <span>{time.test}</span>
  //     </div>
  //   )
  // })}`
  // const startTimer = () => {
  //   const countdownDate = new Date(`2021-04-10,00:05`).getTime()
  //   interval = setInterval(() => {
  //     const now = new Date().getTime()
  //     const distance = countdownDate - now

  //     const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  //     const hours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     )
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  //     if (distance < 0) {
  //       // stop timer
  //       clearInterval(interval.current)
  //     } else {
  //       // update timer
  //       setTimerDays(days)
  //       setTimerHours(hours)
  //       setTimerMinutes(minutes)
  //       setTimerSeconds(seconds)
  //     }
  //   }, 1000)
  // }

  // useEffect(() => {
  //   startTimer()
  //   return () => {
  //     clearInterval(interval.current)
  //   }
  // })
  // ----------------
  const [users, setUsers] = useState('')
  const [value, setValue] = useState('')
  useEffect(() => {
    const subscriber = db
      .collection('medicine')
      .where(
        'AAVerify',
        '==',
        true || 'FCS',
        '==',
        value || 'speciality',
        '==',
        value
      )
      .get()
      .then((snapshot) => {
        const uri = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          uri.push(data)
        })
        setUsers(uri)
      })
      .catch((error) => console.log(error))
    return () => subscriber
  }, [value])

  //Send date appointment
  // const MakeAppointment = async (e) => {
  //   e.preventDefault()
  //   const date = document.getElementById('date').value
  //   const time = document.getElementById('time').value

  //   if (!date || !time) {
  //     return alert('Заполните все поля!')
  //   }
  //   await db
  //     .collection('calendar')
  //     .add({
  //       date_appointment: date,
  //       time_appointment: time,
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
  // const addAppoint = () => {
  //   db.collection('user').add({ test: 'nbnkm' })
  // }

  // const tuesafe = () => {
  //   const tue = document.getElementById('tue')
  //   db.collection('user').add({ test: tue })
  // }

  const toggleTab = (index) => {
    setToggleState(index)
  }
  M.AutoInit()
  const [toggleState, setToggleState] = useState(1)
  return (
    <div>
      <nav>
        <div class="nav-wrapper">
          <a href="#!" class="brand-logo center">
            Медицина
          </a>

          <a
            href="#"
            data-target="slide-out"
            class="sidenav-trigger left show-on-large"
          >
            <i class="material-icons">menu</i>
          </a>
          <ul class="right hide-on-med-and-down">
            <li>
              <input
                type="text"
                placeholder="Найти доктора..."
                onChange={(e) => {
                  setValue(e.target.value)
                }}
              />
            </li>

            <li>
              <a href="#">
                <i class="material-icons">refresh</i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="material-icons">more_vert</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <ul id="slide-out" class="sidenav">
        <li>
          <div class="user-view">
            <div class="background">
              <img alt="mountain" src={mountain} />
            </div>
            <a href="#user">
              <img
                alt="ava"
                class="circle"
                src={fire.auth().currentUser.photoURL}
              />
            </a>
            <a href="#name">
              <span class="white-text name">
                {fire.auth().currentUser.displayName}
              </span>
            </a>
            <a href="#email">
              <span class="white-text email">
                {fire.auth().currentUser.email}
              </span>
            </a>
          </div>
        </li>
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">place</i>Встречи в настоящий момент
            </div>
            <div class="collapsible-body">
              {userTime.map((time, key) => (
                <span key={key}>{time.Montime}</span>
              ))}
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons">whatshot</i>История
            </div>
            <div class="collapsible-body">
              {userTime.map((time, key) => (
                <div key={key}>
                  <span>{time.Montime}</span>
                  <span>{time.Tuetime}</span>
                  <span>{time.Wedtime}</span>
                  <span>{time.Thutime}</span>
                  <span>{time.Fritime}</span>
                  <span>{time.Sattime}</span>
                  <span>{time.Suntime}</span>
                </div>
              ))}
            </div>
          </li>
        </ul>
        <button
          className="btn red accent-4 btnNavbar"
          onClick={() => fire.auth().signOut()}
        >
          Выйти
        </button>
      </ul>

      <div class="container">
        {/* <p>Days:{timerDays}</p>
        <p>hours:{timerHours}</p>
        <p>minutes:{timerMinutes}</p>
        <p>seconds:{timerSeconds}</p> */}
        <br />
        {users &&
          users
            .filter((val) => {
              if (value == '') {
                return val
              } else if (val.FCS.toLowerCase().includes(value.toLowerCase())) {
                return val
              } else if (
                val.speciality.toLowerCase().includes(value.toLowerCase())
              ) {
                return val
              }
            })
            .map((user, key) => {
              return (
                <div className="DocListLeft " key={key}>
                  <div className="row leftAvatar">
                    <img src={user.Avatar} className="avatar " alt="avatar" />
                    <br />
                    <br />

                    {/*  <input type="date" id="date" className="date" />
                    <input type="time" id="time" className="time" />

                    <button className="btn  green " onClick={MakeAppointment}>
                      Записаться
                    </button> */}
                    <Link className="btn green" target="_blank" to="videoCall">
                      Позвонить
                    </Link>

                    <div className="doctor-card-information">{user.FCS}</div>
                  </div>

                  <p>{user.speciality}</p>
                  <p>{user.Education}</p>
                  <p>{user.WorkExperience}</p>
                  <p>{user.PhoneNumber}</p>
                  <div className="row">
                    <div class="col s12">
                      <ul class="tabs">
                        <li class="tab col s4">
                          <a
                            onClick={() => {
                              toggleTab(1)
                            }}
                            href="#"
                          >
                            Информация
                          </a>
                        </li>
                        <li className="tab col s4">
                          <a
                            onClick={() => {
                              toggleTab(2)
                            }}
                            href="#"
                          >
                            Календарь
                          </a>
                        </li>

                        <li className="tab col s4">
                          <a
                            onClick={() => {
                              toggleTab(3)
                            }}
                            href="#"
                          >
                            Видео
                          </a>
                        </li>
                      </ul>
                    </div>

                    <p className={toggleState == 1 ? 'active' : 'inactive'}>
                      {user.LearnMore}
                    </p>
                  </div>
                  <p>{db.collection('medicine').doc().id}</p>

                  <div className={toggleState == 2 ? 'active' : 'inactive'}>
                    <p>
                      <i>
                        {moment(user.Mondate)
                          .locale('ru')
                          .format('DD MMMM, dddd')}
                      </i>
                    </p>
                    <p
                      className="time text-center waves-effect pointer"
                      onClick={() => {
                        db.collection('user')
                          .add({ Montime: user.Montime, Mondate: user.Mondate })
                          .then(
                            () => {
                              M.toast({
                                html: 'Вы успешно добавились!',
                                classNamees: 'rounded',
                              })
                            },
                            (error) => {
                              alert(error.text)
                            }
                          )
                      }}
                    >
                      {user.calendar.Montime}
                    </p>
                    <p>
                      <i>
                        {moment(user.Tuedate)
                          .locale('ru')
                          .format('DD MMMM, dddd')}
                      </i>
                    </p>
                    <p></p>
                    <p
                      className="time text-center waves-effect pointer"
                      onClick={() => {
                        db.collection('user')
                          .add({ Tuetime: user.Tuetime, Tuedate: user.Tuetime })
                          .then(
                            () => {
                              M.toast({
                                html: 'Вы успешно добавились!',
                                classNamees: 'rounded',
                              })
                            },
                            (error) => {
                              alert(error.text)
                            }
                          )
                      }}
                    >
                      {user.calendar.Tuetime}
                    </p>
                    <p>
                      <i>
                        {moment(user.Weddate)
                          .locale('ru')
                          .format('DD MMMM, dddd')}
                      </i>
                    </p>
                    <p
                      className="time text-center waves-effect pointer"
                      onClick={() => {
                        db.collection('user')
                          .add({ Wedtime: user.Wedtime, Weddate: user.Weddate })
                          .then(
                            () => {
                              M.toast({
                                html: 'Вы успешно добавились!',
                                classNamees: 'rounded',
                              })
                            },
                            (error) => {
                              alert(error.text)
                            }
                          )
                      }}
                    >
                      {user.calendar.Wedtime}
                    </p>
                    <p>
                      <i>
                        {moment(user.Thudate)
                          .locale('ru')
                          .format('DD MMMM, dddd')}
                      </i>
                    </p>
                    <p
                      className="time text-center waves-effect pointer"
                      onClick={() => {
                        db.collection('user')
                          .add({ Thutime: user.Thutime, Thudate: user.Thudate })
                          .then(
                            () => {
                              M.toast({
                                html: 'Вы успешно добавились!',
                                classNamees: 'rounded',
                              })
                            },
                            (error) => {
                              alert(error.text)
                            }
                          )
                      }}
                    >
                      {user.calendar.Thutime}
                    </p>
                    <p>
                      <i>
                        {moment(user.Fridate)
                          .locale('ru')
                          .format('DD MMMM, dddd')}
                      </i>
                    </p>
                    <p
                      className="time text-center waves-effect pointer"
                      onClick={() => {
                        db.collection('user')
                          .add({ Fritime: user.Fritime, Fridate: user.Fridate })
                          .then(
                            () => {
                              M.toast({
                                html: 'Вы успешно добавились!',
                                classNamees: 'rounded',
                              })
                            },
                            (error) => {
                              alert(error.text)
                            }
                          )
                      }}
                    >
                      {user.calendar.Fritime}
                    </p>
                    <p>
                      <i>
                        {moment(user.Satdate)
                          .locale('ru')
                          .format('DD MMMM, dddd')}
                      </i>
                    </p>
                    <p
                      className="time text-center waves-effect pointer"
                      onClick={() => {
                        db.collection('user')
                          .add({ Sattime: user.Sattime, Satdate: user.Satdate })
                          .then(
                            () => {
                              M.toast({
                                html: 'Вы успешно добавились!',
                                classNamees: 'rounded',
                              })
                            },
                            (error) => {
                              alert(error.text)
                            }
                          )
                      }}
                    >
                      {user.calendar.Sattime}
                    </p>
                    <p>
                      <i>
                        {moment(user.Sundate)
                          .locale('ru')
                          .format('DD MMMM, dddd')}
                      </i>
                    </p>
                    <p
                      className="time text-center waves-effect pointer"
                      onClick={() => {
                        db.collection('user')
                          .add({ Suntime: user.Suntime, Sundate: user.Sundate })
                          .then(
                            () => {
                              M.toast({
                                html: 'Вы успешно добавились!',
                                classNamees: 'rounded',
                              })
                            },
                            (error) => {
                              alert(error.text)
                            }
                          )
                      }}
                    >
                      {user.calendar.Suntime}
                    </p>
                  </div>

                  <div className={toggleState == 3 ? 'active' : 'inactive'}>
                    <VideoPlayer
                      src={user.SelfVideo}
                      width="342"
                      height="192"
                    />
                  </div>

                  {/* <Calendar /> */}
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default Home

// import VideoPlayer from 'react-video-js-player'
// import AgoraRTC from 'agora-rtc-sdk'

// import React, { Component } from 'react'
// import fire, { db } from './firebase'
// import { Link } from 'react-router-dom'
// // import Calendar from './Calendar'
// import M from 'materialize-css'
// import { CalendarComponent } from '@syncfusion/ej2-react-calendars'

// export default class Home extends Component {
//   state = {
//     filtered: {},
//     setSearchValue: '',
//     searchValue: '',
//   }

//   componentDidMount() {
//     db.collection('medicine')
//       .where('Verify', '!=', false)
//       .orderBy('Verify')
//       .get()
//       .then((snapshot) => {
//         var users = []
//         snapshot.forEach((doc) => {
//           var data = doc.data()
//           users.push(data)
//         })
//         this.setState({ users: users })
//       })
//       .catch((error) => console.log(error))
//   }

//   render() {
//     var MakeAppointment = async (e) => {
//       e.preventDefault()
//       var calendar = document.getElementById('date').value
//       if (!calendar) {
//         return alert('Заполните все поля!')
//       }
//       await db
//         .collection('medicine')
//         .add({
//           date_appointment: calendar,
//         })
//         .then(
//           (result) => {
//             M.toast({
//               html: 'Вы успешно добваились!',
//               classNamees: 'rounded',
//             })
//           },
//           (error) => {
//             alert(error.text)
//           }
//         )
//     }
//     var getValue = [new Date('3-21/2021')]

//     return (
//       <div>
//         <nav>
//           <div class="nav-wrapper">
//             <a href="/" class="brand-logo">
//               <i class="material-icons">cloud</i>Медицина
//             </a>
//             <ul class="right hide-on-med-and-down">
//               <li>
//                 {/* <SearchBar
//                   value={this.state.searchValue}
//                   onChange={this.onChange}
//                 /> */}
//               </li>
//               <li>
//                 <a href="#">
//                   <i class="material-icons">view_module</i>
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <i class="material-icons">refresh</i>
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <i class="material-icons">more_vert</i>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </nav>
//         <div class="container">
//           <br />
//           {this.state.users &&
//             this.state.users.map((user, key) => {
//               return (
//                 <div className="DocListLeft " key={key}>
//                   <div className="row leftAvatar">
//                     <img src={user.Avatar} className="avatar " alt="avatar" />
//                     <br />
//                     <br />
//                     <input
//                       type="date"
//                       id="date"
//                       className="date"
//                       // value="2021-03-30"
//                     />
//                     <button className="btn  green " onClick={MakeAppointment}>
//                       Записаться
//                     </button>
//                     {/* <Link className="btn  green " to="/">
//                       На главную страницу
//                     </Link> */}
//                     <CalendarComponent
//                       id="calendar"
//                       isMultiSelection={true}
//                       values={getValue}
//                     />
//                     <div className="calendarbutton">
//                       {/* <Link
//                         target="_blank"
//                         className="btn green"
//                         to="appointment"
//                       >
//                         Записаться
//                       </Link> */}
//                       <Link
//                         target="_blank"
//                         className="btn  green "
//                         to="/videoCall"
//                       >
//                         Позвонить
//                       </Link>
//                     </div>

//                     {/* <button
//                       className="btn  green"
//                       onClick={this.callLeave}
//                       id="leave"
//                     >
//                       Отключится
//                     </button> */}
//                     <div className="doctor-card-information">{user.FCS}</div>
//                   </div>
//                   {/* <ChannelForm selectChannel={this.selectChannel} /> */}
//                   {/* <Call channel={this.state.channel} /> */}
//                   <p>{user.speciality}</p>
//                   <p>{user.Education}</p>
//                   <p>{user.WorkExperience}</p>
//                   <p>{user.PhoneNumber}</p>
//                   <p>{user.LearnMore}</p>
//                   <p></p>

//                   <VideoPlayer src={user.SelfVideo} width="342" height="192" />
//                 </div>
//               )
//             })}

//           <button
//             className="btn red accent-4"
//             onClick={() => fire.auth().signOut()}
//           >
//             Sign out
//           </button>
//         </div>
//       </div>
//     )
//   }
// }

import React, { useEffect, useState } from 'react'
import fire, { db, storage } from './firebase'
import M from 'materialize-css'
import { emailjs, init } from 'emailjs-com'
import VideoPlayer from 'react-video-js-player'
import car from '../assets/video4.mp4'

const TherapistPage = () => {
  init('user_oiQmeZl62aXxrwjdfexlo')

  M.AutoInit()
  const [data, setData] = useState([])
  useEffect(() => {
    db.collection('medicine').onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  const [imageUrl, setImageUrl] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const storageRef = storage.ref()
    const fileRef = storageRef.child('images/' + file.name)
    await fileRef.put(file)
    setImageUrl(await fileRef.getDownloadURL())
  }
  const onVideoChange = async (e) => {
    const file = e.target.files[0]
    const storageRef = storage.ref()
    const fileRef = storageRef.child('video/' + file.name)
    await fileRef.put(file)
    setVideoUrl(await fileRef.getDownloadURL())
  }

  const Emailsend = async (e) => {
    e.preventDefault()
    // emailjs
    //   .sendForm(
    //     'service_jsgmhba',
    //     'youtube_template',
    //     e.target,
    //     'user_oiQmeZl62aXxrwjdfexlo'
    //   )
    //   .then(
    //     (result) => {
    //       M.toast({
    //         html: 'Ссылка отправлена, пожалуйста ожидайте!',
    //         classNamees: 'rounded',
    //       })
    //     },
    //     (error) => {
    //       alert(error.text)
    //     }
    //   )
    const FCS = document.querySelector('.FCS').value
    const speciality = document.querySelector('.speciality').value
    const Education = document.querySelector('.Education').value
    const WorkExperience = document.querySelector('.WorkExperience').value
    const PhoneNumber = document.querySelector('.PhoneNumber').value
    const LearnMore = document.querySelector('.LearnMore').value
    // Get input Calendar
    const Montime = document.querySelector('.Montime').value
    const Mondate = document.querySelector('.Mondate').value
    const Tuetime = document.querySelector('.Tuetime').value
    const Tuedate = document.querySelector('.Tuedate').value
    const Wedtime = document.querySelector('.Wedtime').value
    const Weddate = document.querySelector('.Weddate').value
    const Thutime = document.querySelector('.Thutime').value
    const Thudate = document.querySelector('.Thudate').value
    const Fritime = document.querySelector('.Fritime').value
    const Fridate = document.querySelector('.Fridate').value
    const Sattime = document.querySelector('.Sattime').value
    const Satdate = document.querySelector('.Satdate').value
    const Suntime = document.querySelector('.Suntime').value
    const Sundate = document.querySelector('.Sundate').value
    const uid = fire.auth().currentUser.uid
    // if (!FCS || !imageUrl || !videoUrl) {
    //   return alert('Заполните все поля!')
    // }
    await db
      .collection('medicine')
      .add({
        AAVerify: false,
        Uid: uid,
        FCS: FCS,
        speciality: speciality,
        Education: Education,
        WorkExperience: WorkExperience,
        PhoneNumber: PhoneNumber,
        LearnMore: LearnMore,
        Avatar: imageUrl,
        SelfVideo: videoUrl,
        // Calendar
        calendar: {
          Montime: Montime,
          Mondate: Mondate,
          Tuetime: Tuetime,
          Tuedate: Tuedate,
          Wedtime: Wedtime,
          Weddate: Weddate,
          Thutime: Thutime,
          Thudate: Thudate,
          Fritime: Fritime,
          Fridate: Fridate,
          Sattime: Sattime,
          Satdate: Satdate,
          Suntime: Suntime,
          Sundate: Sundate,
        },
      })
      .then(
        (result) => {
          M.toast({
            html: 'Вы успешно добавились!',
            classNamees: 'rounded',
          })
        },
        (error) => {
          alert(error.text)
        }
      )
  }

  // Start Send Verify emil

  //---------------------- End send to firestore ----------------------

  /////////////////////////////////////////////////////////////////////
  const test = car
  const poster = 'https://actom.ru/images/2020/11/16/2816616767.jpg'
  M.AutoInit()
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav')
    var instances = M.Sidenav.init(elems)
  })
  return (
    <div>
      {/* {data.map((doc) => (
        <div>
          <p>{doc.FCS}</p>
        </div>
      ))} */}

      <div className="container text-center">
        <h1>Регистрация Доктора</h1>
        <img
          id="img"
          className="img"
          src={imageUrl || 'https://actom.ru/images/2020/11/16/2816616767.jpg'}
          alt="firebase-image"
        />

        <br />
        <br />
        <input type="file" onChange={onFileChange} />

        <br />
        <br />
        <VideoPlayer src={test} poster={poster} width="342" height="192" />
        <input type="file" onChange={onVideoChange} />

        <div className="row">
          <form method="POST" className="col s12 " id="formm">
            <div className="row">
              {/* ----------------------- FCS ----------------------- */}

              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix FCS"
                  type="text"
                  name="FCS"
                  className="validate FCS"
                />
                <label for="icon_prefix">ФИО</label>
              </div>

              {/* ----------------------- speciality ----------------------- */}

              <div className="input-field col s6">
                <i className="material-icons prefix">assignment</i>
                <input
                  id="icon_prefix speciality"
                  type="text"
                  name="speciality"
                  className="validate speciality"
                />
                <label for="icon_prefix">Специальность</label>
              </div>

              {/* ----------------------- Education ----------------------- */}

              <div className="input-field col s6">
                <i className="material-icons prefix">class</i>

                <label for="tentacles">Образование</label>

                <input
                  type="number"
                  id="tentacles Education"
                  className="Education"
                  name="Education"
                  min="0"
                  max="100"
                ></input>
              </div>

              {/* ----------------------- WorkExperience ----------------------- */}

              <div className="input-field col s6">
                <i className="material-icons prefix">business_center</i>

                <label for="tentacles">Опыт работы</label>

                <input
                  type="number"
                  id="tentacles WorkExperience"
                  className="WorkExperience"
                  name="WorkExperience"
                  min="0"
                  max="100"
                ></input>
              </div>

              {/* ----------------------- PhoneNumber ----------------------- */}

              <div className="input-field col s6">
                <i className="material-icons prefix">phone</i>
                <input
                  id="icon_telephone PhoneNumber"
                  name="PhoneNumber"
                  type="tel"
                  className="validate PhoneNumber"
                />
                <label for="icon_telephone">Номер телефона</label>
              </div>

              {/* ----------------------- LearnMore ----------------------- */}

              <div className="input-field col s6">
                <i className="material-icons prefix">access_time</i>

                <textarea
                  id="textarea1 LearnMore"
                  className="materialize-textarea LearnMore"
                  name="LearnMore"
                ></textarea>
                <label for="textarea1">
                  Расскажите подробнее об образовании
                </label>
              </div>
            </div>

            <div className="col  s6">
              <button
                className="btn red btn-success"
                onClick={() => fire.auth().signOut()}
              >
                Выйти
              </button>
            </div>
            <div className="sol s6">
              <input
                type="button"
                onClick={Emailsend}
                className="btn green accent-4"
                id="button"
                value="Отправить"
              />
            </div>
            {/* ----------------------- Mon time ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">access_time</i>
              <input
                id=" time"
                name="time"
                value="12:00"
                type="time"
                className="Montime"
              />
              <label for="icon_telephone">
                Выберите свободное время в понидельник
              </label>
            </div>

            {/* ----------------------- Mon date ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">assignment</i>
              <input
                id="date"
                name="date"
                value="2021-04-22"
                type="date"
                className="Mondate"
              />
              <label for="icon_telephone">
                Выберите свободную дату в понидельник
              </label>

              <a
                class="dropdown-trigger btn btn-floating  waves-effect red"
                href="#"
                data-target="dropdown1"
              >
                <i class="material-icons">add</i>
              </a>

              <ul id="dropdown1" class="dropdown-content">
                <li>
                  <a href="#!">
                    <input type="date" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    bnm
                    {/* <input type="date">Добавить дату</input> */}
                  </a>
                </li>
              </ul>
            </div>
            {/* ----------------------- Tue time ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">access_time</i>
              <input
                id=" time"
                name="time"
                value="12:00"
                type="time"
                className="Tuetime"
              />
              <label for="icon_telephone">
                Выберите свободное время в вторник
              </label>
            </div>

            {/* ----------------------- Tue date ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">assignment</i>
              <input
                id="date"
                name="date"
                value="2021-04-22"
                type="date"
                className="Tuedate"
              />
              <label for="icon_telephone">
                Выберите свободную дату в вторник
              </label>
            </div>
            {/* ----------------------- Wed time ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">access_time</i>
              <input
                id=" time"
                name="time"
                value="12:00"
                type="time"
                className="Wedtime"
              />
              <label for="icon_telephone">
                Выберите свободное время в среду
              </label>
            </div>

            {/* ----------------------- Wed date ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">assignment</i>
              <input
                id="date"
                name="date"
                value="2021-04-22"
                type="date"
                className="Weddate"
              />
              <label for="icon_telephone">
                Выберите свободную дату в среду
              </label>
            </div>
            {/* ----------------------- Thu time ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">access_time</i>
              <input
                id=" time"
                name="time"
                value="12:00"
                type="time"
                className="Thutime"
              />
              <label for="icon_telephone">
                Выберите свободное время в четверг
              </label>
            </div>

            {/* ----------------------- Thu date ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">assignment</i>
              <input
                id="date"
                name="date"
                value="2021-04-22"
                type="date"
                className="Thudate"
              />
              <label for="icon_telephone">
                Выберите свободную дату в четверг
              </label>
            </div>
            {/* ----------------------- Fri time ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">access_time</i>
              <input
                id=" time"
                name="time"
                value="12:00"
                type="time"
                className="Fritime"
              />
              <label for="icon_telephone">
                Выберите свободное время в пятницу
              </label>
            </div>

            {/* ----------------------- Fri date ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">assignment</i>
              <input
                id="date"
                name="date"
                value="2021-04-22"
                type="date"
                className="Fridate"
              />
              <label for="icon_telephone">
                Выберите свободную дату в пятницу
              </label>
            </div>
            {/* ----------------------- Sat time ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">access_time</i>
              <input
                id=" time"
                name="time"
                value="12:00"
                type="time"
                className="Sattime"
              />
              <label for="icon_telephone">
                Выберите свободное время в субботу
              </label>
            </div>

            {/* ----------------------- Sat date ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">assignment</i>
              <input
                id="date"
                name="date"
                value="2021-04-22"
                type="date"
                className="Satdate"
              />
              <label for="icon_telephone">
                Выберите свободную дату в субботу
              </label>
            </div>
            {/* ----------------------- Sun time ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">access_time</i>
              <input
                id=" time"
                name="time"
                value="12:00"
                type="time"
                className="Suntime"
              />
              <label for="icon_telephone">
                Выберите свободное время в воскресенье
              </label>
            </div>

            {/* ----------------------- Sun date ----------------------- */}

            <div className="input-field col s6">
              <i className="material-icons prefix">assignment</i>
              <input
                id="date"
                name="date"
                value="2021-04-22"
                type="date"
                className="Sundate"
              />
              <label for="icon_telephone">
                Выберите свободную дату в воскресенье
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TherapistPage

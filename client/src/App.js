import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { AuthProvider } from './components/Auth'
import PrivateRoute from './components/PrivateRoute'
import DocSignUp from './components/DocSignUp'
import DocLogin from './components/DocLogin'
import TherapistPage from './components/TherapistPage'

// import Appointment from '../components/Appointment'
import CreateRoom from './routes/CreateRoom'
import Room from './routes/Room'
import 'materialize-css'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/docPage" component={TherapistPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/docSignup" component={DocSignUp} />
          <Route exact path="/docLogin" component={DocLogin} />
          {/* <Route exact path="/appointment" component={Appointment} /> */}
          <Route exact path="/videoCall" component={CreateRoom} />

          <Route path="/room/:roomID" component={Room} />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
// После того, как врач выбран пациентом. Пациент смотрит его расписание,
// бронируем дату и время и нажимает кнопку записаться (она становится активной после выбора дат).
// После нажатия этой кнопки врачу и пациенту приходят ссылки на звонок на данное время.
// Когда оно наступает оба проходят по ссылке, открывать комнату может только врач, пациент всегда может только присоединиться.

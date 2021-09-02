import React, { useEffect, useState } from 'react'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars'
import { db } from './firebase'

const Calendar = () => {
  const [users, setUsers] = useState('')
  const [value, setValue] = useState('')

  // const [date, setDate] = useState('')
  useEffect(() => {
    const subscriber = db
      .collection('calendar')
      .orderBy('date_appointment')
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
  {
    users &&
      users
        .filter((val) => {
          if (value == '') {
            return val
          } else if (val.FCS.toLowerCase().includes(value.toLowerCase())) {
            return val
          }
        })
        .map((user, key) => {
          return (
            <div>
              {' '}
              <CalendarComponent
                id="calendar"
                isMultiSelection={true}
                values={
                  [
                    // new Date('4/1/2021'),
                    // new Date('4/15/2021'),
                    // new Date('4/3/2021'),
                    // new Date('4/25/2021'),
                  ]
                }
              />
            </div>
          )
        })
  }
  return (
    <div>
      <CalendarComponent
        id="calendar"
        isMultiSelection={true}
        values={
          [
            // new Date('4/1/2021'),
            // new Date('4/15/2021'),
            // new Date('4/3/2021'),
            // new Date('4/25/2021'),
          ]
        }
      />
    </div>
  )
}

export default Calendar

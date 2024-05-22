import  { useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns"

const DatePicker = ({ value, onChange }) => {
  const [show, setShow] = useState(false)
  return (
    <div className="date-picker-container">
    <button className="date-picker-button" onClick={() => setShow(!show)}>
  {value === null ? "Select value" : format(value, 'MMMM - yyyy')}
</button>
     {show && <DatepickerModel onChange={onChange} value={value} />}
    </div>
 )
}

export default DatePicker

function DatepickerModel ({ value, onChange }) {
  const [ visibleMonth, setVisibleMonth ] = useState(value || new Date());

  const visibleDate = eachDayOfInterval({
    start : startOfWeek(startOfMonth(visibleMonth)),
    end : endOfWeek(endOfMonth(visibleMonth))
  })

  const selectedDate = (date) => {
    onChange(date)
    console.log(date);
  }

  function showNextMonth() {
    setVisibleMonth(currentMonth => {
       return addMonths(currentMonth, 1); 
      }
    );
  }

  function showPrevMonth() {
    setVisibleMonth(currentMonth => {
       return addMonths(currentMonth, -1); 
      }
    );
  }
  return (
    
    <div className="date-picker">
      <div className="date-picker-header">
        <button className="prev-month-button month-button"
        onClick={showPrevMonth}>&larr;
        </button>
        <div className="current-month">
          {format(visibleMonth,"MMMM - yyyy" )}
        </div>
        <button className="next-month-button month-button"
        onClick={showNextMonth}>&rarr;</button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
       {
        visibleDate.map(date => (
          <button
            // onClick={() => onChange(date)}
            onClick={() => selectedDate(date)}
            className={`
              date
              ${!isSameMonth(date, visibleMonth) ? 'date-picker-other-month-date' : ''}
              ${isSameDay(date, value) ? 'selected' : ''}
              ${isToday(date) ? 'today' : ''}
            `}
          key={date.toDateString()}
          >
            {date.getDate()}
          </button>
        ))
       }
      </div>
    </div>
  )
}

   
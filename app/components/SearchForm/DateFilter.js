import React from 'react';
import DatePicker from 'react-datepicker'; // https://github.com/Hacker0x01/react-datepicker
import Moment from 'moment';

export default function DateFilter({ selected, onChangeDate, onChangeSpec, value }) {
  return (
    <div className="date-filter group">
      <label htmlFor="brewed-date-select">First brewed</label>
      <select id="brewed-date-select" className="results-per-page-select"
        onChange={onChangeSpec}
        value={value}
      >
        <option value="brewed_before">Before</option>
        <option value="brewed_after">After</option>
      </select> : <span></span>
      <div className="date-picker">
        <DatePicker
          placeholderText="Date"
          className="input"
          selected={selected && Moment(selected)}
          todayButton={"Today"}
          dateFormat="MM-YYYY"
          showYearDropdown
          onChange={onChangeDate}
        />
      </div>
    </div>
  )
}

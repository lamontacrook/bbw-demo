import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import './modal.css';

const Modal = ({ config, audience }) => {
  const currentAudience = audience || 'none';
  const [runDate, setRunDate] = useState(new Date());
  const updateAudience = (event) => {
    if (event.target.value === 'none') localStorage.removeItem('audience');
    else localStorage.setItem('audience', event.target.value);
  };
  console.log(runDate);
  return (
    <div id="audience-selector" class="modal">
      <div className="modal-content">
        <div className='form-element'>
          <label for='audience'>Audience</label>
          <select id="audience" name="audience" onChange={updateAudience} defaultValue={currentAudience}>
            <option key='none' value='none'>None</option>
            {config && config.audiences.map((audience) => (
              <option key={audience.toLowerCase().replaceAll(' ', '-')} value={audience.toLowerCase().replaceAll(' ', '-')}>{audience}</option>
            )
            )}
          </select>
        </div>
        <br />
        <div className='form-element'>
          <label for='run-as-date'>Run As: </label>
          <DatePicker id='run-as-date' dateFormat='YYYY-MM-DD' defaultValue='run-as-date' selected={runDate} onChange={(date) => setRunDate(date)} />
        </div>
        <div className='form-element'>
          <label for='update'></label>
          <button value='update' id='update' onClick={() => location.reload()}>Update Page</button>
        </div>
      </div>

    </div>
  );
};

Modal.propTypes = {
  config: PropTypes.object,
  audience: PropTypes.string
};

export default Modal;


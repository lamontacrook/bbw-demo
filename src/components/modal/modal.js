import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import './modal.css';

const Modal = ({ config, audience }) => {
  const currentAudience = audience || 'none';
  let dateArry = localStorage.getItem('runas');
  let dateFilter;
  if(dateArry) {
    dateArry = dateArry.split('-');
    dateFilter = new Date(dateArry[0], dateArry[1]-1, dateArry[2]);
  } else {
    dateFilter = new Date();
  }
  const [runDate, setRunDate] = useState(dateFilter);

  const updateAudience = (event) => {
    if (event.target.value === 'none') localStorage.removeItem('audience');
    else localStorage.setItem('audience', event.target.value);
  };

  const expand = (event) => {
    const parent = event.target.parentElement;
    if(parent.classList.contains('inactive')) {
      parent.setAttribute('class', 'modal active');
      event.target.value = 'Collapse Modal';
      event.target.innerText = 'Collapse Modal';
    } else {
      parent.setAttribute('class', 'modal inactive');
      event.target.value = 'Expand Modal';
      event.target.innerText = 'Expand Modal';
    }
    console.log(event.target);
  };

  return (
    <div id="audience-selector" class="modal inactive">
      <button value='expand' id='expand' className='expand' onClick={expand}>Expand Modal</button>
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
          <DatePicker id='run-as-date' dateFormat='yyyy-MM-dd' defaultValue='run-as-date' selected={runDate} onChange={((date) => {
            if(date) {
              const datestring = date.getFullYear() + '-'
                + ('0'+(date.getMonth()+1)).slice(-2) + '-'
                + ('0' + date.getDate()).slice(-2);         
              localStorage.setItem('runas', datestring);
            }
            setRunDate(date);
          })} />
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


import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../utils/context';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { updateCss } from '../screen';
import DatePicker from 'react-datepicker';
import './modal.css';
import 'react-datepicker/dist/react-datepicker.css';


const Modal = ({ config }) => {
  const context = useContext(AppContext);
  const updateCSSList = (item) => {
    let repeat = false;
    cssList.forEach((css) => {
      if (css === item.label) repeat = true;
    });
    if (!repeat) {
      setCSSList([...cssList, item.label]);
    }
  };
  const customize = false;
  const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('lang')) || { value: 'en', label: 'English' });
  const [audience, setAudience] = useState(JSON.parse(localStorage.getItem('audience')));
  let [cssVariables, setCSSVariables] = useState([]);
  const [cssList, setCSSList] = useState([]);
  let dateArry = localStorage.getItem('runas');
  let dateFilter;
  if (dateArry) {
    dateArry = dateArry.split('-');
    dateFilter = new Date(dateArry[0], dateArry[1] - 1, dateArry[2]);
  } else {
    dateFilter = new Date();
  }
  const [runDate, setRunDate] = useState(dateFilter);

  useEffect(() => {

  }, []);

  const updateAudience = (event) => {
    if (event === null) {
      localStorage.removeItem('audience');
    } else {
      localStorage.setItem('audience', JSON.stringify(event));
      setAudience(event);
    }
  };

  const updateLanguage = (event) => {
    localStorage.setItem('lang', JSON.stringify(event));
    setLanguage(event);
  };

  const updatePage = () => {
    let { pathname } = location;
    if (pathname === '/') pathname = config.homePage._path.replace(`/content/dam/${context.project}`, '');
    pathname = pathname.replace(/(\/site\/).*(\/.*\/)/g, '$1' + language.value + '$2');
    window.location.replace(pathname);
  };

  const expand = (event) => {
    event.target.classList.replace('inactive', 'active');
    const vars = Array.from(document.styleSheets)
      .filter(
        sheet =>
          sheet.href === null || sheet.href.startsWith(window.location.origin)
      )
      .reduce((acc, sheet) => (acc = [
        ...acc,
        ...Array.from(sheet.cssRules).reduce(
          (def, rule) => (def =
            rule.selectorText === ':root'
              ? [
                ...def,
                ...Array.from(rule.style).filter(name =>
                  name.startsWith('--')
                )
              ] : def),
          []
        )
      ]), []);

    const arry = vars.map((item) => {
      return { value: item, label: item };
    });
    setCSSVariables(arry);
  };

  const _langOptions = {
    en: 'English',
    es: 'Español'
  };

  const langOptions = config.languages && config.languages.map((lang) => {
    return { value: lang, label: _langOptions[lang] };
  });

  const audienceOptions = config.audienceConfiguration && config.audienceConfiguration.audiences && config.audienceConfiguration.audiences.map((audience) => {
    return { value: audience.toLowerCase().replaceAll(' ', '-'), label: audience };
  });

  const closePanel = (event) => {
    const modal = document.querySelector('.modal.active');
    if (modal) modal.classList.replace('active', 'inactive');
    event.preventDefault();
    return false;
  };

  const updateCSS = (event) => {
    if (event.key == 'Enter') {
      const root = document.querySelector(':root');
      root.style.setProperty(event.target.name, event.target.value);
      if (sessionStorage.getItem('css')) {
        const currentVal = sessionStorage.getItem('css');
        let match = false;
        const currentVals = currentVal.split(',').map((item) => {
          const vals = item.split(':');
          if (vals[0] == event.target.name) {
            vals[1] = event.target.value;
            match = true;
          }
          return vals.join(':');
        });
        if (match) sessionStorage.setItem('css', currentVals.join(','));
        else sessionStorage.setItem('css', `${currentVals.join(',')},${event.target.name}:${event.target.value}`);
      } else {
        sessionStorage.setItem('css', `${event.target.name}:${event.target.value}`);
      }
    }
  };

  const downLoadConfig = () => {
    const href = document.createElement('a');
    let arry = JSON.stringify(sessionStorage.getItem('css'));
    if (arry) arry = arry.split(',').map(item => item);
    const blob = new Blob([arry], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    href.href = url;
    href.download = `${context.project}.json`;
    href.click();
    window.URL.revokeObjectURL(url);
  };

  const handleConfiguration = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const content = reader.result;
      sessionStorage.setItem('css', content.replaceAll('"', '').replaceAll('[', '').replaceAll(']', ''));
      updateCss();
    };

    reader.onerror = function () {
      console.error('Error reading the file');
    };

    reader.readAsText(file, 'utf-8');
  };

  const animatedComponents = makeAnimated();

  return (
    <div id="audience-selector" className="modal inactive" onMouseEnter={expand}>
      <button className='close' onClick={closePanel}>X</button>
      <div className="modal-content">
        <div className='form-element'>
          <label htmlFor='audience'>Audience</label>
          <Select id="audience"
            name="audience"
            defaultValue={audience}
            isClearable={true}
            onChange={updateAudience}
            components={animatedComponents}
            options={audienceOptions} />
          <label htmlFor='lang'>Language</label>
          <Select id='lang'
            name='language'
            onChange={updateLanguage}
            defaultValue={language}
            isClearable={false}
            formatGroupLabel={'Languages'}
            options={langOptions} />
          <label htmlFor='run-as-date'>Run As: </label>
          <DatePicker id='run-as-date' dateFormat='yyyy-MM-dd' defaultValue='run-as-date' selected={runDate} onChange={((date) => {
            if (date) {
              const datestring = date.getFullYear() + '-'
                + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
                + ('0' + date.getDate()).slice(-2);
              localStorage.setItem('runas', datestring);
            }
            setRunDate(date);
          })} />
          <label htmlFor='update'></label>
          <button value='update' id='update' onClick={() => updatePage()}>Update Page</button>
        </div>

        {customize && (
          <React.Fragment>
            <div className='form-element'>
              <label htmlFor='cssVars'>CSS Variables</label>
              <Select id='cssVars'
                name='css-vars'
                onChange={updateCSSList}
                options={cssVariables} />
            </div>
            <div className='form-element'>
              {cssList.map((item) => (
                <React.Fragment key={item}>
                  <label key={`${item}-label`} htmlFor={item}>{item}</label>
                  <input key={`${item}-input`} id={item} name={item} onKeyUp={updateCSS} />
                </React.Fragment>
              ))}
            </div>
            <div className='form-element'>
              <button onClick={downLoadConfig}>Save Configuration</button>
              <input id='configuration' type='file' onChange={handleConfiguration} />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  config: PropTypes.object,
};

export default Modal;
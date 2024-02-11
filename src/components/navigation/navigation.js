import React, { useState } from 'react';

import './navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  let obj = {
    pos1: { name: 'Top Offers', path: '/site/en/top-offers/top-offers' },
    pos2: { name: 'Body Care', path: '#' },
    pos3: { name: 'Candles', path: '#' },
    pos4: { name: 'Wallflowers & Air Fresheners', path: '#' },
    pos5: { name: 'Hand Soaps & Sanitizers', path: '#' },
    pos6: { name: 'Men\'s Shop', path: '#' },
    pos7: { name: 'Laundry Care', path: '#' },
    pos8: { name: 'Top Fragrances', path: '#' },
    pos9: { name: 'New & Now', path: '#' },
    pos10: { name: 'Settings', path: '/settings' },
  };

  return (
    <React.Fragment>
      <nav id="navbar" aria-expanded={expanded}>
        <div className='nav-hamburger' onClick={() => {
          if (expanded) setExpanded(false);
          else setExpanded(true);
          document.body.style.overflowY = expanded ? '' : 'hidden';
        }}>
          <div className='nav-hamburger-icon'></div>
        </div>
        <div className='nav-sections'>
          <ul>
            {Object.entries(obj).map(([key, {name, path}]) => (
              <li key={key}><Link to={path} className={'navItem'} name={name}>{name}</Link></li>
            ))}
          </ul>
        </div>
      </nav >
    </React.Fragment>
  );
};

export default Navigation;
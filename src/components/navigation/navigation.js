import React, { useState } from 'react';

import './navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const language = localStorage.getItem('lang') || 'en';

  let obj = {
    en: {
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
    },
    fr: {
      pos1: { name: 'Meilleures offres', path: '/site/en/top-offers/top-offers' },
      pos2: { name: 'Soins du corps', path: '#' },
      pos3: { name: 'Bougies', path: '#' },
      pos4: { name: 'Giroflées et assainisseurs d\'air', path: '#' },
      pos5: { name: 'Savons et désinfectants pour les mains', path: '#' },
      pos6: { name: 'Boutique pour hommes', path: '#' },
      pos7: { name: 'Entretien du linge', path: '#' },
      pos8: { name: 'Top Fragrances', path: '#' },
      pos9: { name: 'Nouveau et maintenant', path: '#' },
      pos10: { name: 'Paramètres', path: '/settings' },
    },
    es: {
      pos1: { name: 'Ofertas principales', path: '/sitio/es/ofertas-principales/ofertas-principales' },
      pos2: { name: 'Cuidado del cuerpo', path: '#' },
      pos3: { name: 'Velas', path: '#' },
      pos4: { name: 'Alhelíes y ambientadores', path: '#' },
      pos5: { name: 'Jabones y desinfectantes para manos', path: '#' },
      pos6: { name: 'Tienda de hombres', path: '#' },
      pos7: { name: 'Cuidado de la ropa', path: '#' },
      pos8: { name: 'Fragancias principales', path: '#' },
      pos9: { name: 'Nuevo y ahora', path: '#' },
      pos10: { name: 'Configuración', path: '/configuración' },
    }
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
            {Object.entries(obj[language]).map(([key, { name, path }]) => (
              <li key={key}><Link to={path} className={'navItem'} name={name}>{name}</Link></li>
            ))}
          </ul>
        </div>
      </nav >
    </React.Fragment>
  );
};

export default Navigation;
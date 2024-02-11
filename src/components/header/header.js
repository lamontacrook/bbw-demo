/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import Navigation from '../navigation';
import ModelManager from '../../utils/modelmanager';

import './header.css';

const Header = ({ content, config }) => {
  const language = localStorage.getItem('lang') || 'en';

  return (
    <React.Fragment>
      <header className='header' role='banner'>
        <div className="promo-banner-content">
          {language === 'en' && (
            <React.Fragment>
              <ul className='ds-promo-line-1'>
                <li>Member Exclusive! $17.95 3-Wick &amp; Mist</li>
                <li>Sign in &amp; shop</li>
              </ul>
              <ul>
                <li>Limited time only!</li>
                <li>*Promo Details</li>
              </ul>
            </React.Fragment>
          )}

          {language === 'fr' && (
            <React.Fragment>
              <ul className='ds-promo-line-1'>
                <li>Exclusivité réservée aux membres ! 17,95 $ 3 mèches et ampli ; Brume</li> {/* eslint-disable-line no-irregular-whitespace */}
                <li>Connectez-vous etamp; boutique</li>
              </ul>
              <ul>
                <li>Durée limitée !</li> {/* eslint-disable-line no-irregular-whitespace */}
                <li>*Détails de la promotion</li>
              </ul>
            </React.Fragment>
          )}

          {language === 'es' && (
            <React.Fragment>
              <ul className='ds-promo-line-1'>
                <li>¡Exclusivo para miembros! $17,95 3 mechas y mechas niebla</li>
                <li>Iniciar sesión y acceder comprar</li>
              </ul>
              <ul>
                <li>¡Solo por tiempo limitado!</li>
                <li>*Detalles de la promoción</li>
              </ul>
            </React.Fragment>
          )}

        </div>
        <div className='logo'>
          {config && config.configurationByPath && config.configurationByPath.item && (
            <a href='/'>
              <Image asset={config.configurationByPath.item.siteLogo} alt={config.configurationByPath.item.siteLogo.description} config={config} />
            </a>
          )}
        </div>
        <Navigation config={config} />
        <ModelManager
          content={content}
          config={config.configurationByPath.item}
        ></ModelManager>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
  content: PropTypes.object,
  className: PropTypes.string,
  context: PropTypes.object
};

export default Header;
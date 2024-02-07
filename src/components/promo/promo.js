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
import { mapJsonRichText } from '../../utils/renderRichText';

import './promo.css';

const imageSizes = [
  {
    imageWidth: '2000px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1600px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1200px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1000px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '750px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '500px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    size: '100vw',
  }
];

const Promo = ({ content }) => {
  return (
    <React.Fragment>
      <div className='promo'>
        <div className='promo-asset'>
          <Image alt={content.asset.description} title={content.asset.title} asset={content.asset} imageSizes={imageSizes} />
        </div>
        <div className='promo-text'>
          {mapJsonRichText(content.title.json)}
          {mapJsonRichText(content.promotionalLanguage.json)}
        </div>
      </div>
    </React.Fragment>
  );
};

Promo.propTypes = {
  content: PropTypes.object,
};

export default Promo;


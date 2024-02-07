/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import { mapJsonRichText } from '../../utils/renderRichText';

import './banner.css';

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

const Banner = ({ content, config, className }) => {
  return (
    <React.Fragment>
      <div className={`${content.style} banner`}>
        {mapJsonRichText(content.title.json)}
        <Image asset={content.asset} alt={content.asset.title} config={config} imageSizes={imageSizes} />
      </div>
    </React.Fragment>
  );
};

Banner.propTypes = {
  config: PropTypes.object,
  content: PropTypes.object,
  className: PropTypes.string,
};

export default Banner;
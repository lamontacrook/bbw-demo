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
import DynamicMedia from '../dynamicmedia';

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
  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
    'data-aue-type': 'reference',
    'data-aue-filter': 'cf',
    'data-aue-label': 'Promo'
  };

  return (
    <React.Fragment>
      <div className='promo' {...editorProps}>
        <div className='promo-asset'>
          {!content?.dynamicRenditions && (
            <Image alt={content?.asset?.description} title={content?.asset?.title} asset={content.asset} imageSizes={imageSizes} />
          )}
          {content?.dynamicRenditions && content.asset && (
            <DynamicMedia alt={content?.asset?.description} title={content?.asset?.title} asset={content.asset} rendition={content.dynamicRenditions} />
          )}
        </div>
        <div className='promo-text'>
          <span data-aue-prop='title' data-aue-type='richtext' data-aue-label='Headline'>
            {mapJsonRichText(content.title.json)}
          </span>
          <span data-aue-prop='promotionalLanguage' data-aue-type='richtext' data-aue-label='Promotional Language'>
            {mapJsonRichText(content.promotionalLanguage.json)}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

Promo.propTypes = {
  content: PropTypes.object,
  preview: PropTypes.bool
};

export default Promo;


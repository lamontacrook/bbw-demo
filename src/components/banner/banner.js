/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from '../image';
import { AppContext } from '../../utils/context';
import SmartCrops from '../smartcrops';

import './banner.css';
import { LinkManager } from '../../utils';

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

const imageCrops = [
  {
    imageWidth: '1200px',
    imageHeight: '675px',
    renditionName: '169banner'
  },
  {
    imageWidth: '900px',
    imageHeight: '900px',
    renditionName: '11square'
  },
  {
    imageWidth: '480px',
    imageHeight: '600px',
    renditionName: '54vert',
  },
  {
    size: '100vw',
  }
];

const Banner = ({ content, config }) => {
  console.log(content);
  const context = useContext(AppContext);
  const style = content.style ? `${content.style} banner` : 'banner';
  const path = LinkManager(content.link?._path, config, context);
  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
    'data-aue-type': 'reference',
    'data-aue-filter': 'cf',
    'data-aue-label': 'Banner'
  };
  return (
    <React.Fragment>
      <div className={style} {...editorProps}>
        <Link to={path}>
          {content.useSmartCrops && (
            <Image asset={content.asset} alt={content.asset.title} config={config} imageSizes={imageSizes} />
          )}
          {!content.useSmartCrops && (
            <SmartCrops asset={content.asset} alt={content.asset?.description} title={content.asset?.title} config={config} imageSizes={imageCrops} />
          )}
        </Link>
      </div>
    </React.Fragment>
  );
};

Banner.propTypes = {
  config: PropTypes.object,
  content: PropTypes.object,
};

export default Banner;
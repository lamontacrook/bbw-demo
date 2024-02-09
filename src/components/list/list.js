/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React from 'react';
import PropTypes from 'prop-types';
import ModelManager from '../../utils/modelmanager';
import { mapJsonRichText } from '../../utils/renderRichText';
import './list.css';

const List = ({ content, config }) => {
  return (
    <React.Fragment>
      <div className='list'>
        <span>{mapJsonRichText(content.title.json)}</span>
        <div className='elements'>
          {content.promo.map((p) => (
            <ModelManager
              key={p._path}
              content={p}
              config={config}
            ></ModelManager>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

List.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object
};

export default List;
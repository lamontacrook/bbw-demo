import React from 'react';
import Banner from '../../components/banner';
import Promo from '../../components/promo';
import List from '../../components/list';
import PropTypes from 'prop-types';

export const componentMapping = {
  Banner,
  List,
  Promo
};

const ModelManager = ({ content, config }) => {
  const type = content.__typename.replace(/Model/g, '');
  const Component = componentMapping[type];
 
  if (typeof Component !== 'undefined')
    return <Component content={content} config={config} />;
  else return <p>Neet to add {type} to ModelManager.</p>;
};

ModelManager.propTypes = {
  type: PropTypes.string,
  content: PropTypes.object,
  references: PropTypes.string,
  config: PropTypes.object,
  context: PropTypes.object
};

export default ModelManager;

/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../utils/context';
import { prepareRequest } from '../../utils';
import { mapJsonRichText } from '../../utils/renderRichText';
import AJO from '../ajo/ajo';
import './list.css';

const List = ({ content, config }) => {
  const context = useContext(AppContext);
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const sdk = prepareRequest(context);
    sdk.runPersistedQuery(`${context.endpoint}/promo-list`).then(({ data }) => {
      if (data) {
        setPromos(data.promoList.items);
      }
    });
  }, [context]);
  console.log(promos);
  return (
    <React.Fragment>
      <div className='list'>
        <span>{mapJsonRichText(content.title.json)}</span>
        <div className='elements'>
          {promos && promos.map((p) => (
            <AJO key={p._path} config={config}>
              {p}
            </AJO>
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
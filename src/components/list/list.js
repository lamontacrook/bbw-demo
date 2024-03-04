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
  const [od, setOd] = useState([]);

  useEffect(() => {
    const endpoint = 'https://20409-781azuresnake-stage.adobeioruntime.net/api/v1/web/dx-excshell-1/offers';
    const sdk = prepareRequest(context);
    sdk.runPersistedQuery(`${context.endpoint}/promo-list`).then(({ data }) => {
      if (data) {
        setPromos(data.promoList.items);
      }
    });

    fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ 'profile': 'lamont' }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response) {
        response.json().then((data) => {
          if (data && data['xdm:propositions']) {
            data['xdm:propositions'].map((item) => {
              if (item['xdm:options']) {
                item['xdm:options'].map((option) => {
                  // setOd([...od, option['xdm:content']]);
                  od.push(option['xdm:content']);
                });
              }
            });
          }
        });
      }
    });
  }, [context]);
 
  return (
    <React.Fragment>
      <div className='list'>
        <span>{mapJsonRichText(content.title.json)}</span>
        <div className='elements'>
          {promos && od && promos.map((p) => (
            <AJO key={p._path} od={od} config={config}>
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
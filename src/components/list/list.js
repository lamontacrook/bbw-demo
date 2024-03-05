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
import ModelManager from '../../utils/modelmanager/modelmanager';
import './list.css';

const List = ({ content, config, preview = false }) => {
  const context = useContext(AppContext);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const promos = [];
    const endpoint = 'https://20409-781azuresnake-stage.adobeioruntime.net/api/v1/web/dx-excshell-1/offers';
    const sdk = prepareRequest(context);

    const promises = [];

    if (preview) {
      console.log(preview);
      sdk.runPersistedQuery(`${context.endpoint}/promos-all`).then(({data}) => {
        if(data) {
          console.log(data.promoList.items);
          setOffers(data.promoList.items);
        }
      });
    }
    else {
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
                    const path = option['xdm:content'];
                    if (path && (promos.indexOf(path) === -1)) {
                      promos.push(path);
                      promises.push(
                        sdk.runPersistedQuery(`${context.endpoint}/promo-list`, { path: path })
                      );
                    }
                  });
                }
              });
              if (promises.length > 0) Promise.all(promises).then((promise) => {
                setOffers(promise.map((p) => {
                  return p.data;
                }));
              });
            }
          });
        }
      });
    }
  }, [context, preview]);

  let i = 0;

  return (
    <div className='list'>
      {offers.length > 0 && (
        <React.Fragment>
          <span>{mapJsonRichText(content.title.json)}</span>
          <div className='elements'>
            {!preview && offers.map((item) => (
              <ModelManager
                key={`${item?.promoByPath?.item.__typename}-entity-${i++}`}
                content={item?.promoByPath?.item}
                config={config}
              ></ModelManager>
            ))}
            {preview && offers.map((item) => (
              <ModelManager
                key={`${item.__typename}-entity-${i++}`}
                content={item}
                config={config}></ModelManager>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>

  );
};

List.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object,
  preview: PropTypes.bool
};

export default List;
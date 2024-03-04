/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, { useContext, useEffect, useState } from 'react';
import ModelManager from '../../utils/modelmanager';
import PropTypes from 'prop-types';
import { AppContext } from '../../utils/context';

import './ajo.css';

const AJO = ({ children, config, od }) => {
  const context = useContext(AppContext);
  const endpoint = 'https://20409-781azuresnake-stage.adobeioruntime.net/api/v1/web/dx-excshell-1/offers';
  // const [od, setOd] = useState([]);

  useEffect(() => {
    // fetch(endpoint, {
    //   method: 'post',
    //   body: JSON.stringify({ 'profile': 'lamont' }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then((response) => {
    //   if (response) {
    //     response.json().then((data) => {
    //       if (data && data['xdm:propositions']) {
    //         data['xdm:propositions'].map((item) => {
    //           if (item['xdm:options']) {
    //             item['xdm:options'].map((option) => {
    //               // setOd([...od, option['xdm:content']]);
    //               od.push(option['xdm:content']);
    //             });
    //           }
    //         });
    //       }
    //     });
    //   }
    // });

  }, [endpoint]);

  let i = 0;
  // console.log(children);
  console.log(od.length > 0);
  return (
    <React.Fragment>
      {od && (od.length > 0) && od.includes(children?._path) && (
        <ModelManager
          key={`${children.__typename}-entity-${i++}`}
          content={children}
          config={config}
        ></ModelManager>
      )}
    </React.Fragment>
  );


};

AJO.propTypes = {
  children: PropTypes.object,
  config: PropTypes.object,
  od: PropTypes.object
};

export default AJO;
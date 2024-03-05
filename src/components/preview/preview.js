import React, { useContext, useEffect, useState } from 'react';
import ModelManager from '../../utils/modelmanager';
import Header from '../header/header';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { prepareRequest } from '../../utils';
import { useErrorHandler } from 'react-error-boundary';
import { AppContext } from '../../utils/context';
import './preview.css';

const Preview = () => {
  const context = useContext(AppContext);
  const handleError = useErrorHandler();
  const [config, setConfiguration] = useState('');
  const [data, setData] = useState('');
  const [audience, setAudience] = useState('');

  const props = useParams();

  const [modelType, path] = Object.values(props)[0].split(/\/(.*)/s);

  useEffect(() => {
    const params = {};
    if (modelType === 'screen') {
      setAudience(localStorage.getItem('audience'));
      let date = new Date();
      const datestring = date.getFullYear() + '-'
        + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
        + ('0' + date.getDate()).slice(-2);
      date = localStorage.getItem('runas') || datestring;
      params.date = date;
    }

    const configPath = `/content/dam/${context.project}/site/configuration/configuration`;
    const sdk = prepareRequest(context);
    sdk.runPersistedQuery(`${context.endpoint}/configuration`, { path: configPath })
      .then(({ data }) => {
        if (data) {
          setConfiguration(data);
          if (audience && modelType==='screen') params['variation'] = audience;
          params['path'] = `/${path}`;

          console.log(params);

          sdk.runPersistedQuery(`${context.endpoint}/${modelType}-preview`, params)
            .then(({ data }) => {
              if (data) {
                setData(data);
              }
            })
            .catch((error) => {
              error.message = `Error with ${modelType}-preview request:\n ${error.message}`;
              handleError(error);
            });
        }
      }).catch((error) => {
        error.message = `Error with configuration request:\n ${error.message}`;
        handleError(error);
      });


  }, [context, handleError, modelType, path, audience]);

  let i = 0;

  return (
    <React.Fragment>
      {data && data.component && data.component.item && config.configurationByPath && data.component.item.__typename === 'HeaderModel' &&
        <Header data={data} content={data.component.item} config={config} className='screen' />
      }

      <div className='main-body preview'>
        {data && data.component && data.component.item && data.component.item.__typename !== 'HeaderModel' && (
          <div
            key={`${data.component.item.__typename
              .toLowerCase()
              .replace(' ', '-')}-block-${i}`}
            className='block'
          >

            <ModelManager
              key={`${data.component.item.__typename}-entity-${i++}`}
              content={data.component.item}
              config={config.configurationByPath.item}
              preview={true}
            ></ModelManager>
          </div>
        )}

      </div>
      <footer>

      </footer>
    </React.Fragment>
  );
};

Preview.propTypes = {
  pos1: PropTypes.string,
  pos2: PropTypes.string,
  pos3: PropTypes.string,
  location: PropTypes.object,
  context: PropTypes.object
};

export default Preview;

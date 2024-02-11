import React, { useEffect, useState, useContext } from 'react';
import ModelManager from '../../utils/modelmanager';
import Footer from '../footer';
import PropTypes from 'prop-types';
import { prepareRequest } from '../../utils';
import Header from '../header';
import { useErrorHandler } from 'react-error-boundary';
import './screen.css';
import { AppContext } from '../../utils/context';
import { Helmet } from 'react-helmet-async';
import Delayed from '../../utils/delayed';
import Modal from '../modal';
import { useParams } from 'react-router-dom';

let configPath = '';
const Screen = () => {
  const context = useContext(AppContext);
  const handleError = useErrorHandler();
  const [config, setConfiguration] = useState({});
  const [data, setData] = useState('');
  const [screenTitle, setScreenTitle] = useState('');
  const [audience, setAudience] = useState('');

  const path = useParams()['*'];

  configPath = `/content/dam/${context.project}/site/configuration/configuration`;
  useEffect(() => {
    setAudience(localStorage.getItem('audience'));
    let date = new Date();
    const datestring = date.getFullYear() + '-'
      + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
      + ('0' + date.getDate()).slice(-2);
    date = localStorage.getItem('runas') || datestring;
 
    const sdk = prepareRequest(context);
    sdk.runPersistedQuery(`${context.endpoint}/configuration`, { path: configPath })
      .then(({ data }) => {
        if (data) {
          const params = {
            date: date
          };
          if(path) params['path'] = `/content/dam/${context.project}/${path}`;
          if (audience) params['variation'] = audience;

          console.log(`Current audience is ${params.variation}`);
          console.log(`Current date is: ${params.date}`);

          setConfiguration(data);
          setScreenTitle(data.configurationByPath.item.pageTitle);
          sdk.runPersistedQuery(`${context.endpoint}/screen`, params)
            .then(({ data }) => {
              if (data) {
                if (data.screen.body.length === 0) {
                  return (<p>No page available</p>);
                }
                if (Array.isArray(data.screen.body)) {
                  data.screen.body = data.screen.body[0];
                }
                // data.screen.body._metadata.stringMetadata.map((metadata) => {
                //   if (metadata.name === 'title')
                //     setScreenTitle(metadata.value);
                // });

                setData(data);
                context.screenResponse = data;
              }
            })
            .catch((error) => {
              error.message = `Error with screen request:\n ${error.message}`;
              handleError(error);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        if(error.message.includes('<!DOCTYPE'))
          error.message = `There is an issue connecting with AEM.  Make sure you are not using incognito window and logged into AEM author in another tab.\n\n ${error.message}`;
        else
          error.message = `Error with configuration request:\n ${error.message}`;
        
        handleError(error);
      });


  }, [context, handleError, audience, path]);

  let i = 0;
  return (
    <React.Fragment>
      <Helmet>
        <title>{screenTitle}</title>
      </Helmet>
      {data && data?.screen?.body && (
        <Header config={config} content={data.screen.body.header} />
      )}

      <div className='main-body'>
        {data && data?.screen?.body?.block?.map((item) => (
          <div
            key={`${item.__typename
              .toLowerCase()
              .replace(' ', '-')}-block-${i}`}
            className='block'
          >

            <Delayed waitBeforeShow={200}>
              <ModelManager
                key={`${item.__typename}-entity-${i++}`}
                content={item}
                config={config.configurationByPath.item}
              ></ModelManager>
            </Delayed>
          </div>
        ))}
        {config && config.configurationByPath && config.configurationByPath.item && (
          <Modal config={config.configurationByPath.item} audience={audience} />
        )}
      </div>
      <footer>
        {config && config.configurationByPath && config.configurationByPath.item.footerExperienceFragment &&
          <Delayed waitBeforeShow={1200}><Footer config={config.configurationByPath.item.footerExperienceFragment} /></Delayed>
        }
      </footer>
    </React.Fragment>
  );
};

Screen.propTypes = {
  pos1: PropTypes.string,
  pos2: PropTypes.string,
  pos3: PropTypes.string,
  location: PropTypes.object,
  context: PropTypes.object
};

export const ScreenGQL = `query ScreenByPath($path: String!) {
  screen: screenByPath(_path: $path, _assetTransform: {format: PNG, preferWebp: true}) {
    body: item {
      __typename
      _metadata {
        stringMetadata {
          name
          value
        }
      }
      header {
        ... on HeaderModel {
          __typename
          _path
          _metadata {
            stringMetadata {
              name
              value
            }
          }
          banner {
            __typename
            ... on ImageRef {
              mimeType
              _authorUrl
              _dynamicUrl
              width
              height
            }
          }
          navigationColor
          teaser {
            __typename
            title
            style
            preTitle
            callToAction
            callToActionLink: link {
              __typename
              ... on AdventureModel {
                _path
              }
              ... on PageRef {
                _path
                _authorUrl
                _publishUrl
              }
            }
            asset {
              ... on MultimediaRef {
                _authorUrl
                format
                _publishUrl
              }
              ... on ImageRef {
                _authorUrl
                _dynamicUrl
                mimeType
                width
                height
              }
            }
            description {
              html
              plaintext
            }
            callToAction
          }
        }
      }
      block {
        ... on PageRef {
          _path
          _authorUrl
          _publishUrl
          __typename
        }
        ... on ImageListModel {
          _path
          style
          __typename
          _metadata {
            stringMetadata {
              value
              name
            }
          }
          imageListItems {
            ... on PageRef {
              __typename
              _path
              _authorUrl
              _publishUrl
              type
            }
            ... on AdventureModel {
              __typename
              _path
              title
              adventureType
              price
              activity
              tripLength
              primaryImage {
                ... on ImageRef {
                  _dynamicUrl
                  mimeType
                  _authorUrl
                  width
                  height
                }
              }
            }
          }
        }
        ... on TeaserModel {
          __typename
          _path
          _metadata {
            stringMetadata {
              name
              value
            }
          }
          title
          preTitle
          style
          asset {
            ... on MultimediaRef {
              _authorUrl
              format
              _publishUrl
            }
            ... on ImageRef {
              _authorUrl
              _dynamicUrl
              mimeType
              width
              height
            }
          }
          description {
            html
            plaintext
          }
          callToAction
          callToActionLink: link {
            __typename
            ... on AdventureModel {
              __typename
              _path
            }
            ... on PageRef {
              __typename
              _path
              _publishUrl
              _authorUrl
            }
          }
        }
      }
    }
  }
}
`;

export const ConfigurationGQL = `query ConfigurationByPath($path: String!) {
  configurationByPath(
    _path: $path
    _assetTransform: {format: PNG, preferWebp: true}
  ) {
    item {
      adventuresHome
      homePage {
        ... on ScreenModel {
          _path
        }
      }
      footerExperienceFragment {
        ... on PageRef {
          __typename
          _authorUrl
          _publishUrl
        }
      }
      siteLogo {
        ... on ImageRef {
          _authorUrl
          _dynamicUrl
        }
      }
      renditionsConfiguration
      overview {
        ... on ImageRef {
          _dynamicUrl
          _authorUrl
        }
      }
      itinerary {
        ... on ImageRef {
          _dynamicUrl
          _authorUrl
        }
      }
      whatToBring {
        ... on ImageRef {
          _dynamicUrl
          _authorUrl
        }
      }
    }
  }
}

{
  "path":"${configPath}"
}`;

export default Screen;

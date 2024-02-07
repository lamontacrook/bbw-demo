import { createContext } from 'react';
import BrokenImage from '../media/broken.jpg';

// const defaultEndpoint = '/content/_cq_graphql/bbw/endpoint.json';
const defaultProject = 'bbw';
const defaultServiceURL = 'https://author-p124903-e1228403.adobeaemcloud.com/';
const defaultPlaceholdersExtensionURL = 'https://1154643-geoipplaceholders.adobeio-static.net/api/v1/web/geoip-placeholders';
const defaultEndpoint = 'bbw';

export const AppContext = createContext({
  auth: sessionStorage.auth || '',
  endpoint: localStorage.endpoint || defaultEndpoint,
  project: localStorage.project || defaultProject,
  serviceURL: localStorage.serviceURL || defaultServiceURL,
  defaultServiceURL: defaultServiceURL,
  placeholdersExtensionURL: localStorage.placeholdersExtensionURL || defaultPlaceholdersExtensionURL,
  brokenImage: BrokenImage,
  screenResponse: {},
  navigationResponse: {}
});

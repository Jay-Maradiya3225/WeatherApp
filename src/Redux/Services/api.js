import apisauce from 'apisauce';
import config from '../../config';
export const rootApi = apisauce.create({
  baseURL: config.API_URL,
});

const publicAPI = url => {
  return rootApi.get(url);
};

const publicPostAPI = (url, body, header) => {
  return rootApi.post(config.API_URL + '/' + url, body, {});
};

export const api = {
  publicAPI,
  publicPostAPI,
};

export default api;

import {createAction} from 'redux-actions';
import * as types from './actionTypes';

export const request_weather_data = createAction(
  types.REQUEST_WEATHER_DATA,
  location => ({
    weather_loading: true,
    location,
  }),
);

export const success_weather_data = createAction(
  types.SUCCESS_WEATHER_DATA,
  data => ({
    weather_loading: false,
    weather_data: data,
  }),
);

export const failed_weather_data = createAction(
  types.FAILED_WEATHER_DATA,
  () => ({
    weather_loading: false,
    weather_data: {},
  }),
);

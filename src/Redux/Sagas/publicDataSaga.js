import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import * as public_actions from '../Actions/publicDataActions';
import Config from '../../config';
import api from '../Services/api';
export function* watch_public_data_request() {
  yield takeEvery(types.REQUEST_WEATHER_DATA, request_weather_data);
}

function* request_weather_data(action) {
  try {
    const response = yield call(
      api.publicAPI,
      action.payload.location +
        '?unitGroup=metric&key=' +
        Config.API_KEY +
        '&contentType=json',
    );
    if (response.ok && response.data) {
      yield put(public_actions.success_weather_data(response.data));
    } else {
      yield put(public_actions.failed_weather_data());
    }
  } catch (error) {
    yield put(public_actions.failed_weather_data());
    console.log(error);
  }
}

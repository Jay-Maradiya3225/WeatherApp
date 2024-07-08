import {all} from 'redux-saga/effects';
import {watch_public_data_request} from './publicDataSaga';

function* rootSaga() {
  [yield all([watch_public_data_request()])];
}
export default rootSaga;

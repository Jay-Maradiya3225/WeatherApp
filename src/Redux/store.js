// import reducers from '@reducers';
import sagas from './Sagas';
import createSagaMiddleware from 'redux-saga';
import {compose, applyMiddleware, createStore} from 'redux';
// import MainStackNavigator from 'src/navigation/AppNavigator';

import reducers from './Reducers';
// console.disableYellowBox = true;

//create all middleware and add these to redux store
export const sagaMiddleware = createSagaMiddleware();
import {createLogger} from 'redux-logger';

export default () => {
  const logger = createLogger({
    predicate: () => true,
    diff: true,
    duration: true,
  });

  const store = createStore(reducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(sagas);
  return {store};
};

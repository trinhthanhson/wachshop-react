import { takeLatest, put, all } from 'redux-saga/effects';
import { FETCH_NEWS } from '../actions/types';
import { setNews } from '../actions/actions';
import { news } from '../../apis/mock-data'

function* fetchNewsSaga() {
  try {

    yield put(setNews(news));
  } catch (error) {
    console.error('fetchNewsSaga error:', error);
    
  }
}

export function* watchFetchNews() {
  yield takeLatest(FETCH_NEWS, fetchNewsSaga);
}

export default function* newsSaga() {
  yield all([
    watchFetchNews(),
  ]);
}

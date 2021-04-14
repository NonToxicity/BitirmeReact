import {
  changePasswordAsync,
  logoutAsync,
  resetpasswordAsync,
  updateAsync,
  updateLogout, whatIfAsync
} from './actions';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from '@internship/shared/api';
import { removeAccessToken, removeUserName } from '@internship/shared/utils';

function* doResetPassword({ payload }) {
  try {
    yield call(api.auth.resetPassword, payload);
    yield put(resetpasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(resetpasswordAsync.failure(e));
  }
}

function doUpdateLogout() {
  if (localStorage.getItem('access_token')) {
    localStorage.removeItem('cloud_users');
    removeAccessToken();
    removeUserName();
  }
}

function* doLogout({ payload }) {
  try {
    yield call(api.auth.logout, payload);
    yield put(logoutAsync.success({}));
    if (localStorage.getItem('access_token')) {
      localStorage.removeItem('cloud_users');
      removeAccessToken();
      removeUserName();
    }
  } catch (e) {
    console.error(e);
    yield put(logoutAsync.failure(e));
  }
}

function* doUpdate({ payload }) {
  try {
    /* let requestData = {};
     Object.entries(payload).forEach(([key, value]) => (value !== '' ? (requestData = { ...requestData, [key]: value }) : null));*/
    yield call(api.auth.update, payload);
    yield put(updateAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(updateAsync.failure(e));
  }
}

function* doChangePassword({ payload }) {
  try {
    yield call(api.auth.changePassword, payload);
    yield put(changePasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(changePasswordAsync.failure(e));
  }
}

function* doWhatIfWorld({ payload }) {
  try {
    yield call(api.auth.whatIfPost, payload);
    yield put(whatIfAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(whatIfAsync.failure(e));
  }
}

function* watchResetPassword() {
  yield takeLatest(resetpasswordAsync.request, doResetPassword);
}

function* watchWhatIf() {
  yield takeLatest(whatIfAsync.request, doWhatIfWorld);
}

function* watchLogout() {
  yield takeLatest(logoutAsync.request, doLogout);
}

function* watchUpdate() {
  yield takeLatest(updateAsync.request, doUpdate);
}
function* watchChangePassword() {
  yield takeLatest(changePasswordAsync.request, doChangePassword);
}
function* watchUpdateLogout() {
  yield takeLatest(updateLogout, doUpdateLogout);
}

export function* authenticationSaga() {
  yield all([
    fork(watchLogout),
    fork(watchUpdate),
    fork(watchResetPassword),
    fork(watchChangePassword),
    fork(watchUpdateLogout),
    fork(watchWhatIf),
  ]);
}

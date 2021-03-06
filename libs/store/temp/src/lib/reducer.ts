import { tempActions, TempStore } from './types';
import { getType } from 'typesafe-actions';
import { errorRequired, successRequired } from './actions';

const initialState: Partial<TempStore> = { errorRequired: null, successRequired:null };

export function tempReducer(state = initialState, action: tempActions): Partial<TempStore> {
  switch (action.type) {
    case getType(errorRequired):
      return { ...state, errorRequired: action.payload };
    case getType(successRequired):
      return { ...state, successRequired: action.payload };
  }

  return state;
}

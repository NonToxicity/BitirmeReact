import { createAction } from 'typesafe-actions';

export const errorRequired = createAction('@temp/ERROR_REQUIRED')<string>();
export const successRequired = createAction('@temp/SUCCESS_REQUIRED')<string>();

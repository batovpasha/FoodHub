import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { ResourseStatus } from '../constants';

import {
    sendOrderStart,
    sendOrderFinish
} from '../actions';

const initialState = fromJS({
    status: ResourseStatus.READY,
});

export const orderReducer = handleActions({
    [sendOrderStart]: state => state
        .set('status', ResourseStatus.LOADING),
    [sendOrderFinish]: state => state
        .set('status', ResourseStatus.READY),
}, initialState)



